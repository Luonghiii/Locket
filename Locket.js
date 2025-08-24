// Hàm chỉnh header
function setHeaderValue(e, a, d) {
    var r = a.toLowerCase();
    r in e ? e[r] = d : e[a] = d;
}

// Xóa ETag để tránh cache
var modifiedHeaders = $request.headers;
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");
$done({ headers: modifiedHeaders });

// Mapping UA sang gói VIP
const mapping = {
    '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
    'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

// Thông báo chúc mừng
obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

// Thông tin gói mua giả
var locketgold = {
    is_sandbox: false,
    ownership_type: "PURCHASED",
    billing_issues_detected_at: null,
    period_type: "normal",
    expires_date: "2030-08-24T01:04:19Z",
    grace_period_expires_date: null,
    unsubscribe_detected_at: null,
    original_purchase_date: "2025-08-24T01:04:20Z",
    purchase_date: "2025-08-24T01:04:19Z",
    store: "app_store"
};

var locket = {
    grace_period_expires_date: null,
    purchase_date: "2025-08-24T01:04:19Z",
    product_identifier: "com.locketgold.premium.yearly",
    expires_date: "2030-08-24T01:04:19Z"
};

// Tìm mapping theo UA
const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
    let [e, s] = mapping[match];
    if (s) {
        locket.product_identifier = s;
        obj.subscriber.subscriptions[s] = locketgold;
    } else {
        obj.subscriber.subscriptions["com.locketgold.premium.yearly"] = locketgold;
    }
    obj.subscriber.entitlements[e] = locket;
} else {
    obj.subscriber.subscriptions["com.locketgold.premium.yearly"] = locketgold;
    obj.subscriber.entitlements.pro = locket;
}

$done({ body: JSON.stringify(obj) });
