const headers =  { 'Content-Type': 'application/json' };

// const getAPI = async (url, config) => {
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: { ...headers, ...config},
//           body: JSON.stringify(updatedProduct),
//         });
//         if (response.ok) {
//             return response;
//         }
// }

export const getPOST = async (url, data, config = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { ...headers, ...config},
      body: JSON.stringify(data),
    });
    if (response.ok) {
        return response;
    }
}
