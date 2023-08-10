import ShopApi from "./shop.js";
import ProductApi from "./product.js";

function init(app) {
    ShopApi.forEach(api => {
        switch (api.method) {
            case "get":
                app.get(api.path, api.handler)
                break;
            case "post":
                app.post(api.path, api.handler)
                break;
        }
    });
    ProductApi.forEach(api => {
        switch (api.method) {
            case "get":
                app.get(api.path, api.handler)
                break;
        }
    })
}

export default { init };
