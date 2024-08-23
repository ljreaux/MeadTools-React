import Title from "../Title";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();
  return (
    <section className="flex items-center justify-center my-12 w-fit h-fit">
      <div className="flex flex-col items-center justify-center w-11/12 p-8 my-16 sm:w-9/12 rounded-xl bg-background text-foreground">
        <Title header={t("about.label")} />
        <article className="px-12">
          <p className="py-4">{t("about.paragraphOne")}</p>
          <p className="py-4">{t("about.paragraphTwo")}</p>
          <p className="py-4">{t("about.paragraphThree")}</p>
          <ol className="flex flex-col gap-4 py-8 list-decimal">
            <li>{t("about.sourcesList.one")}</li>
            <li>
              {t("about.sourcesList.two.label")}
              <ul className="ml-8 list-disc">
                <li>
                  <a
                    className="underline transition-all text-foreground hover:text-secondary"
                    target="_blank"
                    rel="noreferrer"
                    href=" https://www.homebrewersassociation.org/attachments/0000/2497/Math_in_Mash_SummerZym95.pdf"
                  >
                    {t("about.sourcesList.two.linkText")}
                  </a>
                </li>
                <li>
                  {t("about.sourcesList.two.two.text")}{" "}
                  <a
                    className="underline transition-all text-foreground hover:text-secondary"
                    target="_blank"
                    rel="noreferrer"
                    href="https://docs.google.com/document/d/e/2PACX-1vR89nFNsnMTrIpykZpciqHeRXpO6ysy8MmlBczpLv0ziBxkQ0Qn2B3EiFH7vvNwODOjMJmOvZMqabtj/pub"
                  >
                    {t("about.sourcesList.two.two.linkText")}
                  </a>
                </li>
              </ul>
            </li>
            <li>
              {t("about.sourcesList.three.label")}
              <ul className="ml-8 list-disc">
                <li>
                  <a
                    className="underline transition-all text-foreground hover:text-secondary"
                    target="_blank"
                    rel="noreferrer"
                    href="https://scottlabsltd.com/content/files/documents/sll/handbooks/scott%20canada%202023%20handbook.pdf"
                  >
                    {t("about.sourcesList.three.one.linkText")}
                  </a>
                </li>
                <li>
                  <a
                    className="underline transition-all text-foreground hover:text-secondary"
                    target="_blank"
                    rel="noreferrer"
                    href="https://help.mangrovejacks.com/hc/en-us/article_attachments/13551379984785"
                  >
                    {t("about.sourcesList.three.two.linkText")}
                  </a>
                </li>
                <li>
                  <a
                    className="underline transition-all text-foreground hover:text-secondary"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.piwine.com/media/pdf/yeast-selection-chart.pdf"
                  >
                    {t("about.sourcesList.three.three.linkText")}
                  </a>
                </li>
              </ul>
            </li>
            <li>
              {t("about.sourcesList.four.label")}

              <ul className="ml-8 list-disc">
                <li>
                  <a
                    className="underline transition-all text-foreground hover:text-secondary"
                    target="_blank"
                    rel="noreferrer"
                    href="https://docs.google.com/document/d/11pW-dC91OupCYKX-zld73ckg9ximXwxbmpLFOqv6JEk/edit"
                  >
                    {t("about.sourcesList.four.one.linkText")}
                  </a>
                </li>
              </ul>
            </li>
            <li>
              {t("about.sourcesList.five.label")}
              <ul className="ml-8 list-disc">
                <li>
                  <a
                    className="underline transition-all text-foreground hover:text-secondary"
                    target="_blank"
                    rel="noreferrer"
                    href="https://meadmaking.wiki/en/faq/stabilization_and_backsweetening"
                  >
                    {t("about.sourcesList.five.one.linkText")}
                  </a>
                </li>
              </ul>
            </li>
            <li>
              {t("about.sourcesList.six.label")}
              <ul className="ml-8 list-disc">
                <li>
                  <a
                    className="underline transition-all text-foreground hover:text-secondary"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.homebrewtalk.com/threads/temp-correction-formula-for-hydrometer.10684/"
                  >
                    {t("about.sourcesList.six.one.linkText")}
                  </a>
                </li>
              </ul>
            </li>
            <li>
              {t("about.sourcesList.seven.label")}

              <ul className="ml-8 list-disc">
                <li>
                  <a
                    className="underline transition-all text-foreground hover:text-secondary"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.homebrewersassociation.org/zymurgy-magazine/jul-aug-2017/ "
                  >
                    {t("about.sourcesList.seven.one.linkText")}
                  </a>
                </li>
              </ul>
            </li>
            <li>
              {t("about.sourcesList.eight.label")}

              <ul className="ml-8 list-disc">
                <li>
                  <a
                    className="underline transition-all text-foreground hover:text-secondary"
                    target="_blank"
                    rel="noreferrer"
                    href="http://www.woodlandbrew.com/2013/02/abv-without-og.html"
                  >
                    {t("about.sourcesList.eight.one.linkText")}
                  </a>
                </li>
              </ul>
            </li>
            <li>
              {t("about.sourcesList.nine.label")}

              <ul className="ml-8 list-disc">
                <li>
                  <a
                    className="underline transition-all text-foreground hover:text-secondary"
                    target="_blank"
                    rel="noreferrer"
                    href="https://gotmead.com/blog/the-mead-calculator/"
                  >
                    {t("about.sourcesList.nine.one.linkText")}
                  </a>
                </li>
              </ul>
            </li>
            <li> {t("about.sourcesList.ten.label")}</li>
          </ol>
          <div className="py-12 text-2xl text-center">
            <p>{t("about.sourcesList.thanks.text")}</p>
            <p className="text-4xl py-[3rem]">
              {" "}
              {t("about.sourcesList.thanks.thanks")}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
export default About;
