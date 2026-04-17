"use client";
import { useState } from "react";

export default function Home() {
  const [rating, setRating] = useState(0);
  const [menu, setMenu] = useState("");
  const [trigger, setTrigger] = useState("");
  const [atmosphere, setAtmosphere] = useState<string[]>([]);
  const [recommend, setRecommend] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [screen, setScreen] = useState<"survey" | "result">("survey");
  const [reviewText, setReviewText] = useState("");

  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const generate = () => {
    const starText = ["", "★☆☆☆☆", "★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★★"][rating] || "";
    const triggerMap: Record<string, string> = {
      友人の紹介: "友人に教えてもらい",
      SNSで見た: "SNSで見かけて",
      近くを通りかかった: "近くを通りかかって",
      リピート: "リピートで",
      Googleマップ: "Googleマップで見つけて",
    };
    const lines = [];
    if (starText) lines.push(starText);
    if (menu) lines.push(`今回は${menu}を注文しました。`);
    if (trigger) lines.push(`${triggerMap[trigger] || trigger}訪問しました。`);
    if (atmosphere.length) lines.push(`雰囲気は${atmosphere.join("・")}で、居心地がよかったです。`);
    if (recommend.length) lines.push(`特に${recommend.join("・")}が印象的でした。`);
    if (comment) lines.push(comment);
    lines.push("また来たいと思います。おすすめのお店です！");
    setReviewText(lines.join("\n"));
    setScreen("result");
  };

  const tags = (id: string, items: string[], selected: string | string[], onSelect: (v: string) => void) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          style={{
            padding: "6px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer",
            background: (Array.isArray(selected) ? selected.includes(item) : selected === item) ? "#dbeafe" : "#f3f4f6",
            border: (Array.isArray(selected) ? selected.includes(item) : selected === item) ? "1px solid #93c5fd" : "1px solid #e5e7eb",
            color: (Array.isArray(selected) ? selected.includes(item) : selected === item) ? "#1d4ed8" : "#374151",
          }}
        >{item}</button>
      ))}
    </div>
  );

  return (
    <main style={{ maxWidth: 420, margin: "0 auto", padding: "1rem", fontFamily: "sans-serif" }}>
      {screen === "survey" ? (
        <>
          <p style={{ fontSize: 13, color: "#6b7280" }}>料理が届くまでの間にお答えください</p>

          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>今日注文したメニューは？</p>
            <input value={menu} onChange={(e) => setMenu(e.target.value)} placeholder="例：マルゲリータピザ、生ビール" style={{ width: "100%", boxSizing: "border-box", padding: "8px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14 }} />
          </div>

          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>来店のきっかけは？</p>
            {tags("trigger", ["友人の紹介", "SNSで見た", "近くを通りかかった", "リピート", "Googleマップ"], trigger, setTrigger)}
          </div>

          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>お店の雰囲気はどうですか？</p>
            {tags("atm", ["落ち着いた", "にぎやか", "おしゃれ", "アットホーム", "広々", "デートに◎"], atmosphere, (v) => setAtmosphere(toggleArray(atmosphere, v)))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>友達に一番伝えたいことは？</p>
            {tags("rec", ["料理がおいしい", "コスパが最高", "スタッフが親切", "アクセスが便利", "駐車場あり", "子連れOK"], recommend, (v) => setRecommend(toggleArray(recommend, v)))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>総合評価</p>
            <div style={{ display: "flex", gap: 8 }}>
              {[1,2,3,4,5].map((v) => (
                <span key={v} onClick={() => setRating(v)} style={{ fontSize: 30, cursor: "pointer", color: v <= rating ? "#f59e0b" : "#d1d5db" }}>★</span>
              ))}
            </div>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>一言あれば（任意）</p>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="率直な感想など..." style={{ width: "100%", boxSizing: "border-box", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14, minHeight: 72, resize: "none" }} />
          </div>

          <button onClick={generate} style={{ width: "100%", padding: 13, borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 15, cursor: "pointer", background: "#fff" }}>
            クチコミ文を生成する →
          </button>
        </>
      ) : (
        <>
          <p style={{ fontSize: 13, color: "#6b7280" }}>クチコミ文ができました！</p>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>生成されたクチコミ</p>
            <p style={{ fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{reviewText}</p>
          </div>
          <button onClick={() => { navigator.clipboard.writeText(reviewText); window.open("https://search.google.com/local/writereview?placeid=ChIJQ_JhX9oPAWARPySrRzKjREU", "_blank"); }} style={{ width: "100%", padding: 13, borderRadius: 8, border: "none", fontSize: 15, cursor: "pointer", background: "#dbeafe", color: "#1d4ed8", fontWeight: 500, marginBottom: 8 }}>
            Googleマップに投稿する ↗
          </button>
          <button onClick={() => setScreen("survey")} style={{ width: "100%", padding: 13, borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 15, cursor: "pointer", background: "#fff" }}>
            ← やり直す
          </button>
        </>
      )}
    </main>
  );
}