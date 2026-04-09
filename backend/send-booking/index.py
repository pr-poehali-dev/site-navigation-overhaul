"""Отправляет заявку с формы бронирования в Telegram."""
import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "invalid json"})}

    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    checkin = body.get("checkin", "").strip()
    guests = body.get("guests", "").strip()
    comment = body.get("comment", "").strip()
    package = body.get("package", "").strip()

    if not name or not phone:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "name and phone required"})}

    lines = [
        "🌊 *Новая заявка — МоёМоре*",
        "",
        f"👤 *Имя:* {name}",
        f"📞 *Телефон:* {phone}",
    ]
    if checkin:
        lines.append(f"📅 *Дата заезда:* {checkin}")
    if guests:
        lines.append(f"👥 *Гостей:* {guests}")
    if package:
        lines.append(f"🏷 *Пакет:* {package}")
    if comment:
        lines.append(f"💬 *Пожелания:* {comment}")

    text = "\n".join(lines)

    token = os.environ["TELEGRAM_BOT_TOKEN"]
    chat_id = os.environ["TELEGRAM_CHAT_ID"]

    payload = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown",
    }).encode()

    req = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=10) as resp:
        tg_resp = json.loads(resp.read())

    if not tg_resp.get("ok"):
        return {"statusCode": 500, "headers": headers, "body": json.dumps({"error": "telegram error", "detail": tg_resp})}

    return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True})}
