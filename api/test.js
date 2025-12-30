// 간단한 테스트 엔드포인트
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    try {
        // 패키지 로드 테스트
        let packagesStatus = {};
        
        try {
            require('@google/generative-ai');
            packagesStatus['@google/generative-ai'] = 'OK';
        } catch (e) {
            packagesStatus['@google/generative-ai'] = `ERROR: ${e.message}`;
        }
        
        try {
            require('openai');
            packagesStatus['openai'] = 'OK';
        } catch (e) {
            packagesStatus['openai'] = `ERROR: ${e.message}`;
        }
        
        res.status(200).json({
            status: 'ok',
            message: 'API 함수가 정상적으로 작동합니다.',
            packages: packagesStatus,
            environment: {
                hasGeminiKey: !!process.env.GEMINI_API_KEY,
                hasOpenAIKey: !!process.env.OPENAI_API_KEY,
                nodeVersion: process.version
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            stack: error.stack
        });
    }
};

