import "./globals.css";

export const metadata = {
  title: "समर आयुर्वेदिक क्लीनिक",
  description:
    "समर आयुर्वेदिक क्लीनिक के लिए आधुनिक Next.js वेबसाइट। डॉक्टर प्रोफाइल, उपचार सूची, अपॉइंटमेंट अनुरोध, कॉल और व्हाट्सऐप संपर्क एक ही जगह।"
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
