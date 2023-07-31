import VueFbCustomerChat from "vue-fb-customer-chat";

export default function (context, inject) {
    // Optionally, you can pass your configuration as the second argument
    const options = {
        page_id: 225591027631621,
        theme_color: "#333333",
        locale: "en_US",
    };

    inject("VueFbCustomerChat", VueFbCustomerChat, options);
}
