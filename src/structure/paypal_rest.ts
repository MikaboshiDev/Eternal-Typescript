import paypal, { configure } from "paypal-rest-sdk"
paypal.configure({
   mode: 'sandbox', 
   client_id: '',
   client_secret: '',
});

export { paypal } 