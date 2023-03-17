import "./About.css";
import aboutImg from "../../../materials/img/about.png";

export default function About() {
  return (
    <article className="about-page">
      <div className="container">
        <h2 className="about-page-title">Про нас</h2>
        <div className="about-page-content">
          <div className="about-content-wrapper">
            <div className="about-content-head">
              <hr />
              <h3 className="about-content-title">Історія</h3>
            </div>
            <p className="about-content-text">
              Це одна з наймасовіших громадських організацій спортивного танцю
              України. Існує понад 20 років, має представництва у більшості
              регіонів та областей. Пріоритети - це автоматизація процесів,
              командна робота, сучасний підхід. Наша організація - частина
              танцювального світу, який ми робимо кращим! Есть много вариантов
              Lorem Ipsum, но большинство из них имеет не всегда приемлемые
              модификации, например, юмористические вставки или слова, которые
              даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum
              для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки,
              скрытой в середине абзаца. Также все другие известные генераторы
              Lorem Ipsum используют один и тот же текст, который они просто
              повторяют, пока не достигнут нужный объём. Это делает предлагаемый
              здесь генератор единственным настоящим Lorem Ipsum генератором. Он
              использует словарь из более чем 200 латинских слов, а также набор
              моделей предложений. В результате сгенерированный Lorem Ipsum
              выглядит правдоподобно, не имеет повторяющихся абзацей или
              "невозможных" слов.
            </p>
          </div>
          <img className="about-img" src={aboutImg} alt="" />
        </div>
      </div>
    </article>
  );
}
