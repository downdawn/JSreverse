ah.proxy({
    //请求成功后进入
    onResponse: (response, handler) => {
        if (response.config.url.startsWith('/api/movie')) {
            axios.post('http://127.0.0.1:5000/receiver/movie', {
                url: window.location.href,
                data: response.response
            });
            console.log(response.response);
            handler.next(response)
        }
    }
});
