const APIHandler = {
    handleResponse: function(response) {
        // Store the API response in localStorage
        const encryptedData = DataEncryption.encryptData(response);
        localStorage.setItem('api_response', encryptedData);
        
        // Update UI based on response type
        if (response.token) {
            localStorage.setItem('auth_token', response.token);
            SessionManager.startSession();
        }
        
        return response;
    },

    handleError: function(error) {
        // Log error for debugging
        console.error('API Error:', error);
        
        // Store error in localStorage for reporting
        const errorLog = JSON.parse(localStorage.getItem('error_logs') || '[]');
        errorLog.push({
            timestamp: new Date().toISOString(),
            error: error.message
        });
        localStorage.setItem('error_logs', JSON.stringify(errorLog));
        
        throw error;
    }
};