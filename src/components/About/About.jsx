import Title from "../Title";

function About() {
  return (
    <div className="w-fit h-fit flex items-center justify-center ">
      <div className="component-div text-textColor flex flex-col items-center justify-center my-56">
        {" "}
        <Title header="About MeadTools" />
        <div className="px-12">
          <p className="text-center py-4">
            MeadTools came to me as an idea to help my mead making community
            while simultaneously kickstarting a new career in software
            development. There are several other tools to assist in mead making,
            but most are confusing to beginners, or, in my opinion incomplete.
            My hope is that MeadTools solves these issues.
          </p>
          <p className="text-center py-4">
            Below I have listed all of the resources that I used in the creation
            of MeadTools as well as additional mead making resources. I can’t
            think my personal mead community enough for making this project
            possible. I can be found on discord in the Doin’ the Most and Man
            Made Mead Mazer servers. My user name is larry_r. I can also be
            contacted through the link in the top right.
          </p>
          <p className="text-center py-4">
            MeadTools is completely open source under a MIT license, so if you
            want to check out the code, please have a look over on GitHub. If
            you use any of the code for anything fun, I just ask that you share
            it with me and the rest of the mead making community.
          </p>
          <ol className="list-decimal pt-8">
            <li>
              Almost all of the ingredient data was gathered from the USDA
              FoodData Central https://fdc.nal.usda.gov/
            </li>
            <li>
              ABV formula was taken from
              <ul className="list-disc ml-8 break-all">
                <li>
                  https://www.homebrewersassociation.org/attachments/0000/2497/Math_in_Mash_SummerZym95.pdf
                </li>
                <li>
                  Important reading on ABV can be found from the person that
                  gave MeadTools it’s name.
                  https://docs.google.com/document/d/e/2PACX-1vR89nFNsnMTrIpykZpciqHeRXpO6ysy8MmlBczpLv0ziBxkQ0Qn2B3EiFH7vvNwODOjMJmOvZMqabtj/pub
                </li>
              </ul>
            </li>
            <li>
              Yeast information
              <ul className="list-disc ml-8 break-all">
                <li>
                  https://scottlabsltd.com/content/files/documents/sll/handbooks/scott%20canada%202023%20handbook.pdf
                </li>
                <li>
                  https://help.mangrovejacks.com/hc/en-us/article_attachments/13551379984785
                </li>
                <li>
                  https://www.piwine.com/media/pdf/yeast-selection-chart.pdf
                </li>
              </ul>
            </li>
            <li>
              {" "}
              Nutrient schedule and requirement information
              <ul className="list-disc ml-8 break-all">
                <li>
                  https://docs.google.com/document/d/11pW-dC91OupCYKX-zld73ckg9ximXwxbmpLFOqv6JEk/edit
                </li>
              </ul>
            </li>
            <li>
              Sorbate and Sulfite information, as well as SO many other things
              <ul className="list-disc ml-8 break-all">
                <li>
                  {" "}
                  https://meadmaking.wiki/en/faq/stabilization_and_backsweetening
                </li>
              </ul>
            </li>
            <li>
              Hydrometer Temperature correction
              <ul className="list-disc ml-8 break-all">
                <li>
                  {" "}
                  https://www.homebrewtalk.com/threads/temp-correction-formula-for-hydrometer.10684/
                </li>
              </ul>
            </li>
            <li>
              {" "}
              Refractometer calculator
              <ul className="list-disc ml-8 break-all">
                <li>
                  https://www.homebrewersassociation.org/zymurgy-magazine/jul-aug-2017/
                </li>
              </ul>
            </li>
            <li>
              {" "}
              Calculating OG without reading
              <ul className="list-disc ml-8 break-all">
                <li>
                  {" "}
                  http://www.woodlandbrew.com/2013/02/abv-without-og.html{" "}
                </li>
              </ul>
            </li>
            <li>
              {" "}
              General inspiration
              <ul className="list-disc ml-8 break-all">
                <li>https://gotmead.com/blog/the-mead-calculator/ </li>
              </ul>
            </li>
            <li>Ash and StormBeforeDawn from the Mead Hall discord</li>
          </ol>

          <p className="py-12 text-2xl text-center">
            To the entire mead making community, or all of the help,
            inspiration, and knowledge I have gained over the past 4 years{" "}
            <h1 className="text-4xl py-8">Thank you</h1>
          </p>
        </div>
      </div>
    </div>
  );
}
export default About;
