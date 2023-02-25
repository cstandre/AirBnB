import Cookies from 'js-cookie'; // exptract XSRF-TOKEN cookie value

export async function csrfFetch(url, options = {}){
    // if there is not a header given, then header will be empty
    options.headers = options.headers || {};
    // if there is not method given, then method will be GET
    options.method = options.method || 'GET';


    // if the method don't equal GET
    if (options.method.toUpperCase() !== 'GET') {
        // set the header content-type to 'application/json'
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        // set the header XSRF-Token to the extracted XSRF-token
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }

    const res = await window.fetch(url, options);

    if (res.status >= 400 ) throw res;

    return res;
};

export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}
