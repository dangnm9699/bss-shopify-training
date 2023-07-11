import ShopApi from "./shop.js";

function init(app) {
    ShopApi.forEach(api => {
        switch (api.method) {
            case "get":
                app.get(api.path, api.handler)
                break;
        }
    })
}

export default { init };
