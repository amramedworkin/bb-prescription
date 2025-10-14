// Comprehensive error handling
async function fetchPlanDocuments() {
  try {
    const response = await fetch('/sa/plandocs/v1/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + bearerToken,
        'id_token': idToken
      }
    });

    if (response.status === 401) {
      // Handle authentication failure
      console.error('Authentication failed - please log in again');
      return;
    }

    if (response.status === 403) {
      // Handle authorization failure
      console.error('Insufficient permissions to access plan documents');
      return;
    }

    if (!response.ok) {
      const error = await response.json();
      console.error('Request failed:', error.moreInformation);
      return;
    }

    const documents = await response.json();
    return documents;
  } catch (error) {
    console.error('Network error:', error);
  }
} 