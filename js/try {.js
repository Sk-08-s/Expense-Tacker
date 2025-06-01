try {
    const response = await fetch('/api/transactions');
    const data = await response.json();
    APIHandler.handleResponse(data);
} catch (error) {
    APIHandler.handleError(error);
}