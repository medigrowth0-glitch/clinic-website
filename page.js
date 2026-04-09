"use client";

import { useState } from "react";

const clinic = {
  name: "समर आयुर्वेदिक क्लीनिक",
  phoneDisplay: "94167-15187",
  phoneHref: "+919416715187",
  location: "दुर्गा मंदिर के पास, गांव बीघड़, जिला फतेहाबाद",
  doctors: [
    {
      name: "डॉ. सुनील",
      degree: "B.A.M.S.",
      description: "आयुर्वेदिक परामर्शदाता, क्लीनिक में सामान्य और दीर्घकालिक समस्याओं पर ध्यान।"
    },
    {
      name: "डॉ. रविन्द्र",
      degree: "B.A.M.S.",
      description: "मरीज की समस्या समझकर सरल भाषा में सलाह देने और फॉलो-अप मार्गदर्शन में सहयोग।"
    }
  ],
  treatments: [
    {
      title: "त्वचा और एलर्जी",
      description: "दाद, खुजली, नजला और एलर्जी जैसी समस्याओं के लिए आयुर्वेदिक परामर्श।",
      tags: ["दाद", "खुजली", "नजला", "एलर्जी"]
    },
    {
      title: "जोड़ और दर्द",
      description: "गठिया, यूरिक एसिड और जोड़ों के दर्द के लिए जड़ी-बूटी आधारित मार्गदर्शन।",
      tags: ["गठिया", "यूरिक एसिड", "जोड़ दर्द"]
    },
    {
      title: "बवासीर देखभाल",
      description: "बवासीर के लिए दवाई उपलब्ध है और प्राथमिक सलाह दी जाती है।",
      tags: ["बवासीर"]
    },
    {
      title: "स्त्री रोग सहायता",
      description: "ल्यूकोरिया और बच्चेदानी की रसौली जैसी समस्याओं पर परामर्श।",
      tags: ["ल्यूकोरिया", "बच्चेदानी", "रसौली"]
    },
    {
      title: "गुर्दे की पथरी",
      description: "पथरी से जुड़ी परेशानियों के लिए आयुर्वेदिक समाधान पर चर्चा।",
      tags: ["गुर्दे की पथरी", "पथरी"]
    },
    {
      title: "सामान्य आयुर्वेदिक परामर्श",
      description: "अन्य पुरानी या बार-बार होने वाली समस्याओं के लिए सलाह हेतु संपर्क करें।",
      tags: ["आयुर्वेदिक", "पुरानी बीमारी", "परामर्श"]
    }
  ]
};

const navItems = [
  { href: "#about", label: "हमारे बारे में" },
  { href: "#treatments", label: "उपचार" },
  { href: "#doctors", label: "डॉक्टर" },
  { href: "#appointment", label: "अपॉइंटमेंट" },
  { href: "#contact", label: "संपर्क" }
];

const issueOptions = [
  "दाद / खुजली / एलर्जी",
  "गठिया / जोड़ दर्द",
  "बवासीर",
  "ल्यूकोरिया / स्त्री रोग",
  "गुर्दे की पथरी",
  "अन्य"
];

const trustItems = [
  {
    title: "अनुभवी डॉक्टर",
    description: "दोनों डॉक्टर B.A.M.S. योग्यता के साथ आयुर्वेदिक परामर्श प्रदान करते हैं।"
  },
  {
    title: "आम और पुरानी बीमारियों पर ध्यान",
    description: "त्वचा, जोड़ों, स्त्री रोग और पथरी जैसी समस्याओं के लिए मार्गदर्शन।"
  },
  {
    title: "सीधे संपर्क की सुविधा",
    description: "कॉल, व्हाट्सऐप और वेबसाइट फॉर्म से मरीज तुरंत संपर्क कर सकते हैं।"
  }
];

export default function HomePage() {
  const [navOpen, setNavOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [formState, setFormState] = useState({
    patientName: "",
    patientPhone: "",
    patientIssue: "",
    patientTiming: "",
    patientMessage: ""
  });
  const [formResult, setFormResult] = useState("");

  const normalizedSearch = search.trim().toLowerCase();
  const filteredTreatments = clinic.treatments.filter((treatment) => {
    if (!normalizedSearch) {
      return true;
    }

    const haystack = `${treatment.title} ${treatment.description} ${treatment.tags.join(" ")}`.toLowerCase();
    return haystack.includes(normalizedSearch);
  });

  function handleNavClick() {
    setNavOpen(false);
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formState.patientName || !formState.patientPhone || !formState.patientIssue) {
      setFormResult("कृपया नाम, मोबाइल नंबर और समस्या जरूर भरें।");
      return;
    }

    const whatsappMessage = [
      "नमस्ते, मुझे समर आयुर्वेदिक क्लीनिक में अपॉइंटमेंट चाहिए।",
      `नाम: ${formState.patientName}`,
      `मोबाइल: ${formState.patientPhone}`,
      `समस्या: ${formState.patientIssue}`,
      formState.patientTiming ? `पसंदीदा समय: ${formState.patientTiming}` : "",
      formState.patientMessage ? `अतिरिक्त जानकारी: ${formState.patientMessage}` : ""
    ]
      .filter(Boolean)
      .join("\n");

    setFormResult("अनुरोध तैयार हो गया है। व्हाट्सऐप विंडो खुल रही है।");

    if (typeof window !== "undefined") {
      window.open(
        `https://wa.me/919416715187?text=${encodeURIComponent(whatsappMessage)}`,
        "_blank",
        "noopener,noreferrer"
      );
    }

    setFormState({
      patientName: "",
      patientPhone: "",
      patientIssue: "",
      patientTiming: "",
      patientMessage: ""
    });
  }

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#top">
            <span className="brand-mark">ॐ</span>
            <span>
              <strong>{clinic.name}</strong>
              <small>विश्वसनीय आयुर्वेदिक परामर्श</small>
            </span>
          </a>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={navOpen}
            aria-label="मेनू खोलें"
            onClick={() => setNavOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`site-nav ${navOpen ? "is-open" : ""}`} aria-label="मुख्य नेविगेशन">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={handleNavClick}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">आयुर्वेदिक देखभाल, भरोसे के साथ</p>
              <h1>त्वचा, जोड़ों, पाचन और पुरानी समस्याओं के लिए समर्पित क्लीनिक</h1>
              <p className="lead">
                अनुभवी B.A.M.S. डॉक्टरों के मार्गदर्शन में दाद, खुजली, एलर्जी, गठिया, यूरिक एसिड, बवासीर,
                जोड़ों का दर्द, ल्यूकोरिया, बच्चेदानी की रसौली और गुर्दे की पथरी जैसी समस्याओं के लिए
                आयुर्वेदिक इलाज।
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary" href={`tel:${clinic.phoneHref}`}>
                  अभी कॉल करें
                </a>
                <a
                  className="btn btn-secondary"
                  href="https://wa.me/919416715187?text=नमस्ते%2C%20मुझे%20समर%20आयुर्वेदिक%20क्लीनिक%20में%20अपॉइंटमेंट%20चाहिए।"
                  target="_blank"
                  rel="noreferrer"
                >
                  व्हाट्सऐप पर बात करें
                </a>
              </div>

              <ul className="hero-points">
                {clinic.doctors.map((doctor) => (
                  <li key={doctor.name}>
                    {doctor.name}, {doctor.degree}
                  </li>
                ))}
                <li>{clinic.location}</li>
              </ul>
            </div>

            <div className="hero-card">
              <div className="card-ribbon">विशेष सूचना</div>
              <h2>बवासीर की दवाई उपलब्ध</h2>
              <p>
                क्लीनिक में बवासीर से संबंधित आयुर्वेदिक दवाइयां उपलब्ध हैं। प्राथमिक जानकारी लेकर सही
                परामर्श के लिए सीधे डॉक्टर से संपर्क करें।
              </p>

              <div className="quick-details">
                <div>
                  <span>फोन</span>
                  <strong>{clinic.phoneDisplay}</strong>
                </div>
                <div>
                  <span>स्थान</span>
                  <strong>बीघड़, फतेहाबाद</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-grid">
            {trustItems.map((item) => (
              <article key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="about">
          <div className="container section-grid">
            <div>
              <p className="section-tag">क्लीनिक परिचय</p>
              <h2>स्थानीय भरोसे और सरल पहुंच के साथ आयुर्वेदिक सेवा</h2>
              <p>
                समर आयुर्वेदिक क्लीनिक का उद्देश्य मरीजों को उनकी समस्या समझकर संतुलित आयुर्वेदिक सलाह देना
                है। वेबसाइट को ऐसे बनाया गया है ताकि गांव या आसपास के क्षेत्रों से आने वाले मरीज आसानी से
                जानकारी, उपचार सूची और संपर्क विकल्प देख सकें।
              </p>
              <p>
                यह वेबसाइट नए मरीजों के लिए परिचय, परामर्श अनुरोध और क्लीनिक तक पहुंचने की जानकारी एक ही जगह
                उपलब्ध कराती है।
              </p>
            </div>

            <div className="feature-stack">
              <article className="feature-card">
                <h3>मरीज केंद्रित अनुभव</h3>
                <p>बड़ी, साफ टाइपोग्राफी और हिंदी सामग्री ताकि हर आयु वर्ग के लोग आसानी से पढ़ सकें।</p>
              </article>
              <article className="feature-card">
                <h3>जल्दी अपॉइंटमेंट अनुरोध</h3>
                <p>
                  फॉर्म भरते ही मरीज को व्हाट्सऐप संदेश तैयार मिलता है, जिससे बातचीत तुरंत शुरू हो सके।
                </p>
              </article>
              <article className="feature-card">
                <h3>मोबाइल फ्रेंडली डिजाइन</h3>
                <p>फोन पर देखने के लिए खास तौर पर रिस्पॉन्सिव लेआउट, ताकि ग्रामीण क्षेत्र में भी आसानी रहे।</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section alt" id="treatments">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="section-tag">उपचार सेवाएं</p>
                <h2>क्लीनिक में जिन समस्याओं के लिए परामर्श उपलब्ध है</h2>
              </div>

              <label className="search-box">
                <span>उपचार खोजें</span>
                <input
                  type="search"
                  placeholder="जैसे एलर्जी, बवासीर, पथरी"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
            </div>

            <div className="treatment-grid">
              {filteredTreatments.map((treatment) => (
                <article key={treatment.title} className="treatment-card">
                  <h3>{treatment.title}</h3>
                  <p>{treatment.description}</p>
                </article>
              ))}
            </div>

            {filteredTreatments.length === 0 ? (
              <p className="search-empty">इस नाम से कोई सेवा नहीं मिली। कृपया दूसरा शब्द लिखें।</p>
            ) : null}
          </div>
        </section>

        <section className="section" id="doctors">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="section-tag">डॉक्टर प्रोफाइल</p>
                <h2>क्लीनिक का मार्गदर्शन करने वाले विशेषज्ञ</h2>
              </div>
            </div>

            <div className="doctor-grid">
              {clinic.doctors.map((doctor) => (
                <article key={doctor.name} className="doctor-card">
                  <div className="doctor-badge">{doctor.degree}</div>
                  <h3>{doctor.name}</h3>
                  <p>{doctor.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt" id="appointment">
          <div className="container appointment-grid">
            <div>
              <p className="section-tag">अपॉइंटमेंट</p>
              <h2>वेबसाइट से सीधे परामर्श अनुरोध भेजें</h2>
              <p>
                नीचे दिया गया फॉर्म मरीज की जानकारी लेकर स्क्रीन पर पुष्टि दिखाता है और व्हाट्सऐप के लिए संदेश
                तैयार करता है। यह छोटे क्लीनिक के लिए आसान और व्यावहारिक फीचर है।
              </p>

              <div className="info-list">
                <div>
                  <strong>कॉल</strong>
                  <a href={`tel:${clinic.phoneHref}`}>+91 94167 15187</a>
                </div>
                <div>
                  <strong>व्हाट्सऐप</strong>
                  <a
                    href="https://wa.me/919416715187?text=नमस्ते%2C%20मुझे%20अपॉइंटमेंट%20चाहिए।"
                    target="_blank"
                    rel="noreferrer"
                  >
                    संदेश भेजें
                  </a>
                </div>
                <div>
                  <strong>पता</strong>
                  <span>{clinic.location}</span>
                </div>
              </div>
            </div>

            <form className="appointment-form" onSubmit={handleSubmit}>
              <label>
                <span>मरीज का नाम</span>
                <input
                  type="text"
                  name="patientName"
                  placeholder="अपना नाम लिखें"
                  value={formState.patientName}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                <span>मोबाइल नंबर</span>
                <input
                  type="tel"
                  name="patientPhone"
                  placeholder="10 अंकों का नंबर"
                  value={formState.patientPhone}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                <span>समस्या</span>
                <select
                  name="patientIssue"
                  value={formState.patientIssue}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">समस्या चुनें</option>
                  {issueOptions.map((issue) => (
                    <option key={issue} value={issue}>
                      {issue}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>अपॉइंटमेंट की पसंद</span>
                <input
                  type="text"
                  name="patientTiming"
                  placeholder="जैसे कल सुबह, शाम 5 बजे"
                  value={formState.patientTiming}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                <span>अतिरिक्त जानकारी</span>
                <textarea
                  name="patientMessage"
                  rows="4"
                  placeholder="लक्षण या जरूरी जानकारी लिखें"
                  value={formState.patientMessage}
                  onChange={handleFormChange}
                />
              </label>
              <button className="btn btn-primary btn-block" type="submit">
                अपॉइंटमेंट अनुरोध तैयार करें
              </button>
              <p className="form-result" aria-live="polite">
                {formResult}
              </p>
            </form>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container contact-grid">
            <div className="contact-card">
              <p className="section-tag">संपर्क</p>
              <h2>क्लीनिक तक पहुंचने के लिए जरूरी जानकारी</h2>
              <ul className="contact-list">
                <li>
                  <strong>क्लीनिक नाम:</strong> {clinic.name}
                </li>
                <li>
                  <strong>फोन:</strong> <a href={`tel:${clinic.phoneHref}`}>{clinic.phoneDisplay}</a>
                </li>
                <li>
                  <strong>पता:</strong> {clinic.location}
                </li>
                <li>
                  <strong>विशेष:</strong> बवासीर की दवाई उपलब्ध
                </li>
              </ul>
            </div>

            <div className="contact-card map-card">
              <p className="section-tag">लोकेशन गाइड</p>
              <h2>मरीज को रास्ता समझाने के लिए</h2>
              <p>
                क्लीनिक दुर्गा मंदिर के पास स्थित है। यदि सटीक मैप लिंक बाद में मिल जाए, तो इसी सेक्शन में
                Google Maps एम्बेड आसानी से जोड़ा जा सकता है।
              </p>
              <div className="map-placeholder">
                <span>दुर्गा मंदिर के पास</span>
                <strong>गांव बीघड़, जिला फतेहाबाद</strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <div>
            <strong>{clinic.name}</strong>
            <p>विश्वास, सरलता और आयुर्वेदिक देखभाल के लिए समर्पित वेबसाइट।</p>
          </div>
          <div className="footer-actions">
            <a href={`tel:${clinic.phoneHref}`}>कॉल</a>
            <a href="https://wa.me/919416715187" target="_blank" rel="noreferrer">
              व्हाट्सऐप
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
