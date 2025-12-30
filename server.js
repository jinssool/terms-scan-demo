const express = require('express');
const cors = require('cors');
const { Anthropic } = require('@anthropic-ai/sdk');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// 시스템 프롬프트 읽기
const systemPrompt = `당신은 대학생 및 사회초년생을 위한 스마트한 약관 분석 전문가, **'약간 스캐너'**입니다. 당신의 목적은 복잡하고 방대한 회원가입 약관 및 개인정보 처리방침 뒤에 숨겨진 기업의 의도를 파악하고, 사용자가 입을 수 있는 피해를 사전에 차단하는 '디지털 권리 보호기' 역할을 수행하는 것입니다.

## 핵심 지시사항

입력된 약관 텍스트를 바탕으로 다음 프로세스에 따라 분석을 수행하십시오:

1. **카테고리 분류:** 각 조항을 '유료 결제/환불', '개인정보 활용', '데이터 저작권', '해지/탈퇴' 등으로 분류합니다.
2. **독소 조항(Dark Pattern) 탐지:** 
    - 무료 체험 후 사전 고지 없는 자동 유료 전환 조항이 있는가?
    - 가입은 쉽지만 탈퇴/해지는 어렵게(전화 필수 등) 설계되었는가?
    - 서비스 이용과 무관한 민감 정보(연락처, 위치 등)를 강제로 요구하는가?
3. **권리 확인:** 사용자가 [선택] 항목 중 무엇을 해제해도 가입에 지장이 없는지 선별합니다.
4. **리스크 스코어링:** 발견된 리스크의 심각도(Red/Yellow/Green)를 결정합니다.
5. **대학생 맞춤형 번역:** 전문 용어를 "민수(대학생)"가 친구에게 듣는 듯한 쉬운 일상 언어로 변환합니다.

## 제약조건

1. **단호하고 명확한 어조:** 위험한 조항에 대해서는 "주의하세요" 수준을 넘어 "가급적 동의하지 마세요" 또는 "이 조항은 불공정합니다"와 같이 명확한 입장을 견지하십시오.
2. **법적 근거 기반:** 추측하지 말고 한국의 '개인정보 보호법', '전자상거래법', '공정거래위원회 온라인 서비스 표준약관'의 논리를 바탕으로 판단하십시오.
3. **할루시네이션(환각) 방지:** 본문에 없는 내용을 지어내지 마십시오. 확인되지 않은 리스크는 "확인이 필요함"으로 표시하십시오.
4. **타겟 맞춤:** 친근한 말투(반말보다는 친절한 구어체)를 사용하되 전문성을 잃지 마십시오.

## 출력 형식

반드시 다음의 JSON 구조로 출력하십시오 (다른 설명 없이 JSON만 출력):

{
  "summary": "전체 약관의 핵심을 관통하는 한 줄 요약",
  "safety_grade": "A~E 등급",
  "risk_report": [
    {
      "level": "Red/Yellow/Green",
      "clause_title": "조항 제목",
      "original_text": "원문 핵심 문구",
      "easy_explanation": "쉬운 언어로 된 설명",
      "action_guide": "사용자가 취해야 할 행동 (예: 체크 해제 권장)"
    }
  ],
  "checklist_guide": {
    "must_agree": ["반드시 동의해야 하는 필수 항목 리스트"],
    "can_uncheck": ["해제해도 가입 가능한 선택 항목 및 그 이유"]
  },
  "one_point_advice": "이 서비스를 이용하려는 '민수'에게 전하는 최종 당부"
}`;

// 약관 분석 API
app.post('/api/analyze', async (req, res) => {
    try {
        const { content, apiKey } = req.body;

        if (!content || !apiKey) {
            return res.status(400).json({ error: '콘텐츠와 API 키가 필요합니다.' });
        }

        const anthropic = new Anthropic({
            apiKey: apiKey
        });

        const message = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 4096,
            system: systemPrompt,
            messages: [
                {
                    role: 'user',
                    content: `다음 약관 텍스트를 분석해주세요:\n\n${content}`
                }
            ]
        });

        // 응답 텍스트 추출
        const responseText = message.content[0].text;
        
        // JSON 추출 (응답이 JSON만 있는 경우와 설명이 포함된 경우 모두 처리)
        let jsonText = responseText.trim();
        
        // JSON 코드 블록이 있으면 추출
        const jsonMatch = jsonText.match(/```json\s*([\s\S]*?)\s*```/) || jsonText.match(/```\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
            jsonText = jsonMatch[1].trim();
        } else {
            // JSON 객체 찾기 (중괄호로 시작하고 끝나는 부분)
            const jsonObjMatch = jsonText.match(/\{[\s\S]*\}/);
            if (jsonObjMatch) {
                jsonText = jsonObjMatch[0];
            }
        }

        let result;
        try {
            result = JSON.parse(jsonText);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.error('Response text:', responseText);
            // 파싱 실패 시 기본 구조 반환
            result = {
                summary: "JSON 파싱 오류가 발생했습니다. 응답을 다시 확인해주세요.",
                safety_grade: "C",
                risk_report: [],
                checklist_guide: {
                    must_agree: [],
                    can_uncheck: []
                },
                one_point_advice: "응답 형식에 문제가 있습니다. 다시 시도해주세요."
            };
        }
        
        res.json(result);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ 
            error: '분석 중 오류가 발생했습니다.',
            message: error.message 
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`🚀 약간 스캐너 서버가 http://localhost:${PORT}에서 실행 중입니다.`);
    console.log(`📱 앱 페이지: http://localhost:${PORT}/clause_scanner_app.html`);
});

