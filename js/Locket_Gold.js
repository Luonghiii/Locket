// ========= ID ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};
// =========   Phần cố định  ========= // 
// =========  @Luonghiii ========= // 
var ua=$request.headers["User-Agent"]||$request.headers["user-agent"],obj=JSON.parse($response.body);obj.Attention="Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";var locket={is_sandbox:!1,ownership_type:"PURCHASED",billing_issues_detected_at:null,period_type:"normal",expires_date:"2099-12-18T01:04:17Z",grace_period_expires_date:null,unsubscribe_detected_at:null,original_purchase_date:"2025-08-24T01:04:18Z",purchase_date:"2025-08-24T01:04:17Z",store:"app_store"},locketgold={grace_period_expires_date:null,purchase_date:"2025-07-24T01:04:17Z",product_identifier:"com.locket.premium.yearly",expires_date:"2099-12-18T01:04:17Z"};const match=Object.keys(mapping).find(e=>ua.includes(e));if(match){let[e,s]=mapping[match];s?(locketgold.product_identifier=s,obj.subscriber.subscriptions[s]=locket):obj.subscriber.subscriptions["com.locket.premium.yearly"]=locket,obj.subscriber.entitlements[e]=locketgold}else obj.subscriber.subscriptions["com.locket.premium.yearly"]=locket,obj.subscriber.entitlements.pro=locketgold;$done({body:JSON.stringify(obj)});
