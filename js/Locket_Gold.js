// ========= ID ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

// =========   Phần cố định  ========= // 
// =========  @Luonghiii ========= // 

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"],
    obj = JSON.parse($response.body);

// Thông báo chú ý
obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

// Fake receipt Locket basic
var locket = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2100-10-10T00:00:00Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2025-11-01T00:00:00Z",
  purchase_date: "2025-11-01T00:00:00Z",
  store: "app_store"
};

// Fake entitlement Gold
var locketgold = {
  grace_period_expires_date: null,
  purchase_date: "2025-11-01T00:00:00Z",
  product_identifier: "com.locket.premium.yearly",
  expires_date: "2100-10-10T00:00:00Z"
};

// Check user-agent matching
const match = Object.keys(mapping).find(key => ua.includes(key));

if (match) {
  let [entitlement, subKey] = mapping[match];

  if (subKey) {
    locketgold.product_identifier = subKey;
    obj.subscriber.subscriptions[subKey] = locket;
  } else {
    obj.subscriber.subscriptions["com.locket.premium.yearly"] = locket;
  }

  obj.subscriber.entitlements[entitlement] = locketgold;

} else {

  // Fallback default unlock
  obj.subscriber.subscriptions["com.locket.premium.yearly"] = locket;
  obj.subscriber.entitlements.pro = locketgold;
}

$done({
  body: JSON.stringify(obj)
});
