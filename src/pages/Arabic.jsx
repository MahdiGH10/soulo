import { Link } from "react-router-dom";
import { site, freshaUrl, mapsUrl, isOpenNow } from "../data/site.js";
import Reveal from "../components/Reveal.jsx";
import Picture from "../components/Picture.jsx";
import "./Arabic.css";

/**
 * The Arabic surface.
 *
 * Deliberately not a line-for-line mirror of the English pages. A guest who
 * reads Arabic and is deciding whether to spend SAR 490 needs the same five
 * answers the English site gives across five pages, in one scroll: what a head
 * spa is, what it costs, who does it, where it is, and how to book. Splitting
 * that across five Arabic routes would add navigation without adding answers.
 *
 * Everything here is a translation of copy that already exists in English, or a
 * fact already verified in site.js. Nothing is claimed in Arabic that is not
 * claimed in English.
 */

const SERVICES = [
  {
    name: "Hyggee Spa",
    desc: "الطقس الكامل للرأس على ست مراحل: غسيل بماء دافئ، وفروة الرأس، والرقبة والكتفين، ثم العلاج والختام.",
    price: "٤٩٠",
    dur: "ساعة واحدة",
    badge: "الأساسي",
  },
  {
    name: "Hyggee Spa + Face Massage",
    desc: "الطقس نفسه، ممتدّاً إلى تدليك الوجه. أطول جلسة في القائمة.",
    price: "٦٩٠",
    dur: "ساعة و٣٠ دقيقة",
  },
  {
    name: "Classic Manicure & Pedicure",
    desc: "عناية كاملة باليدين والقدمين.",
    price: "٢٨٠",
    dur: "ساعة و١٥ دقيقة",
  },
  {
    name: "Regular Nail Polish",
    desc: "لمسة أخيرة سريعة تُضاف إلى أي زيارة.",
    price: "٣٥",
    dur: "١٥ دقيقة",
  },
];

const STAGES = [
  ["٠١", "الوصول", "تُخلع الأحذية، ويُقدَّم الشاي، ويبقى ضجيج طريق الملك عبدالعزيز خلف الباب. لا شيء يبدأ قبل أن تجلس."],
  ["٠٢", "الاستشارة", "حديث قصير عن فروة رأسك وشعرك والضغط الذي تفضّله. مسألة راحة، لا تشخيص."],
  ["٠٣", "التنظيف", "ماء دافئ، على مهل، وغسيل مزدوج."],
  ["٠٤", "الاسترخاء", "الرقبة والكتفان وفروة الرأس باليد."],
  ["٠٥", "الاستعادة", "علاج يُختار حسب حالة شعرك في ذلك اليوم."],
  ["٠٦", "الختام", "تجفيف وتصفيف، وعودة هادئة إلى الشارع."],
];

const FAQ = [
  ["هل هذا غسيل شعر في صالون أم جلسة سبا؟", "جلسة سبا. الفرق في الوقت والضغط والهدوء، لا في المنتجات وحدها. ساعة كاملة مخصّصة لك."],
  ["هل أحتاج إلى تحضير أي شيء قبل الزيارة؟", "لا. تعال كما أنت."],
  ["هل يمكنني اختيار الأخصائية؟", "نعم. اختر بالاسم عند الحجز عبر Fresha، أو اتركها مفتوحة."],
  ["كيف أدفع؟", "الحجز والدفع يتمّان داخل تطبيق Fresha، مع تأكيد فوري."],
];

export default function Arabic() {
  const open = isOpenNow();

  return (
    <div className="ar" dir="rtl" lang="ar">
      <section className="ar-hero">
        <div className="ar-hero__media" aria-hidden="true">
          <Picture base="hero" alt="" eager sizes="100vw" />
        </div>
        <div className="ar-hero__scrim" aria-hidden="true" />

        <div className="shell ar-hero__body">
          <Reveal as="p" className="ar-eyebrow">الرأس والجسد والروح</Reveal>
          <Reveal as="h1" delay={90} className="ar-h1">
            ساعة لا تطلب منك شيئاً.
          </Reveal>
          <Reveal as="p" delay={180} className="ar-lede">
            عناية بفروة الرأس والشعر، مبنية على مفهوم الـ hygge، على طريق الملك عبدالعزيز.
            ماء دافئ، وأيادٍ غير مستعجلة، وإضاءة خافتة، وغرفة صُمّمت للسكون.
          </Reveal>

          <Reveal delay={260} className="ar-actions">
            <a className="btn btn--invert" href={freshaUrl("ar-hero")} target="_blank" rel="noopener noreferrer">
              احجز الآن <span aria-hidden="true">↗</span>
            </a>
            <Link className="btn btn--ghost" to="/">English</Link>
          </Reveal>

          <Reveal delay={340} className="ar-proof">
            <span><strong>{site.rating.value}</strong> من {site.rating.count.toLocaleString("ar-EG")} تقييم</span>
            <span>الأحد إلى الجمعة، ٢ ظهراً إلى ١١ مساءً</span>
            <span>السبت، ١١ صباحاً إلى ٨ مساءً</span>
            {open ? <span className="ar-open">مفتوح الآن</span> : null}
          </Reveal>
        </div>
      </section>

      <section id="about" className="section">
        <div className="shell">
          <Reveal as="h2" className="ar-h2">ما هو الـ head spa؟</Reveal>
          <Reveal as="p" delay={80} className="ar-body">
            ليست جلسة غسيل شعر. هي ساعة كاملة تُعامَل فيها فروة الرأس كما يُعامَل الجلد في جلسة
            عناية بالبشرة: تنظيف على مراحل، وتدليك لفروة الرأس والرقبة والكتفين، وعلاج يُختار
            حسب حالة شعرك، ثم تصفيف وختام هادئ. أُسّس المكان عام {site.established} حول كلمة
            دنماركية واحدة، hygge، ومعناها أنّ الراحة شيء يمكن تصميمه: الحرارة والضوء والضغط
            والإيقاع، كلّها مقرَّرة سلفاً حتى لا يبقى عليك أن تقرّر شيئاً أثناء الزيارة.
          </Reveal>

          <ol className="ar-stages">
            {STAGES.map(([n, name, body], i) => (
              <Reveal as="li" key={n} delay={i * 60} className="ar-stage">
                <span className="ar-stage__n">{n}</span>
                <div>
                  <h3 className="ar-h3">{name}</h3>
                  <p className="ar-body ar-body--sm">{body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="prices" className="section section--tint">
        <div className="shell">
          <Reveal as="h2" className="ar-h2">الأسعار</Reveal>
          <Reveal as="p" delay={70} className="ar-body ar-body--sm">
            الأسعار كما هي منشورة على Fresha. الحجز والدفع يتمّان هناك، بتأكيد فوري.
          </Reveal>

          <ul className="ar-rows">
            {SERVICES.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 60} className="ar-row">
                <div className="ar-row__main">
                  <h3 className="ar-row__name">
                    {s.name}
                    {s.badge ? <span className="ar-badge">{s.badge}</span> : null}
                  </h3>
                  <p className="ar-row__desc">{s.desc}</p>
                </div>
                <span className="ar-row__dur">{s.dur}</span>
                <a
                  className="ar-row__price"
                  href={freshaUrl("ar-menu", s.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.price} ريال <span aria-hidden="true">↗</span>
                </a>
              </Reveal>
            ))}
          </ul>

          <Reveal as="p" delay={200} className="ar-body ar-body--sm ar-note">
            ٤١ خدمة في المجمل على Fresha، منها تركيب الأظافر والجل والتصفيف.
          </Reveal>
        </div>
      </section>

      <section id="team" className="section">
        <div className="shell">
          <Reveal as="h2" className="ar-h2">الأخصائيات</Reveal>
          <Reveal as="p" delay={70} className="ar-body">
            تسع أخصائيات يمكنك اختيار أيّ منهنّ بالاسم عند الحجز. الضيوف يذكرنهنّ بأسمائهنّ في
            التقييمات دون أن يُسألن. إن وجدت أيادٍ تناسبك، اطلبها في المرة القادمة.
          </Reveal>
          <Reveal delay={140} className="ar-quote">
            <blockquote>«تجربة رائعة وفعلاً حسّيت بأن شعري تنفّس والأخصائية لطيفة جداً وشاطرة»</blockquote>
            <p className="ar-credit">أثوب أ. · ١٧ يوليو ٢٠٢٦</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--tint">
        <div className="shell">
          <Reveal as="h2" className="ar-h2">أسئلة قبل الحجز</Reveal>
          <div className="ar-faq">
            {FAQ.map(([q, a], i) => (
              <Reveal as="details" key={q} delay={i * 60} className="ar-faq__item">
                <summary className="ar-h3">{q}</summary>
                <p className="ar-body ar-body--sm">{a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="section">
        <div className="shell">
          <Reveal as="h2" className="ar-h2">الزيارة</Reveal>
          <Reveal delay={80} className="ar-visit">
            <div>
              <p className="ar-label">العنوان</p>
              <p className="ar-body">
                طريق الملك عبدالعزيز، حي المحمدية، جدة
                <br />
                <a className="link" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  الاتجاهات على الخرائط <span aria-hidden="true">↗</span>
                </a>
              </p>
            </div>
            <div>
              <p className="ar-label">أوقات العمل</p>
              <p className="ar-body">
                الأحد إلى الجمعة، ٢ ظهراً إلى ١١ مساءً
                <br />
                السبت، ١١ صباحاً إلى ٨ مساءً
              </p>
            </div>
            <div>
              <p className="ar-label">التواصل</p>
              <p className="ar-body">
                <a className="link" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  واتساب <span aria-hidden="true">↗</span>
                </a>
                <br />
                <a className="link" href={site.instagram} target="_blank" rel="noopener noreferrer">
                  إنستقرام <span aria-hidden="true">↗</span>
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="ar-close">
        <div className="shell">
          <Reveal as="h2" className="ar-h2">تعال ودَعنا نعتني بك.</Reveal>
          <Reveal as="p" delay={80} className="ar-body">
            الحجز يستغرق دقيقة تقريباً، والتأكيد فوري.
          </Reveal>
          <Reveal delay={140}>
            <a className="btn btn--invert" href={freshaUrl("ar-close")} target="_blank" rel="noopener noreferrer">
              احجز على Fresha <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
