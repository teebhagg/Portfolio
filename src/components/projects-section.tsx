import { Container, Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import ProjectCard from "./preoject-card";

enum projectType {
  web = "Web Development",
  mobile = "Mobile App Development",
  design = "User Interface Design",
}

const urls = {
  blogUrl: "https://bhagg-bloggs-frontend.vercel.app/",
  arrantUrl:"https://arrantservices.org/",
  greenGhanaUrl: "https://play.google.com/store/apps/details?id=org.fcghana.green_ghana&hl=en",
  storifyUrl: "https://storify-ten.vercel.app/",
  movieWebUrl: "https://teebhagg.github.io/dpmovies/",
  profitradeUrl: "https://profitrade.tech",
  theTransporterUrl: "",
  theTransporterCourierUrl: "",
}

const description = {
  blogDescr: "Blog Website (Bhagg Bloggs)",
  arrantDescr: "Official Website for Arrant Services",
  greenGhanaDescr: "Green Ghana",
  storifyDescr: "E-Commerce (Development in Progress)",
  movieWebUrl: "Movie Web App (Undergoing redesign)",
  profitradeDescr: "Crypto Trading Platform",
  theTransporterDescr: "The Transporter (Soon to be released)",
  theTransporterCourierDescr: "The Transporter - Courier (Soon to be released)",
}


export default function ProjectsSection() {
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 660px)",
  });

  const isTabletDevice = useMediaQuery({
    query: "(max-device-width: 768px)",
  });

  const blog_image = require("../images/blog.png");
  const arrant_image = require("../images/arrant.png");
  const movie_image = require("../images/movie.png");
  const storify_image = require("../images/storify.png");
  const profitrade = require("../images/profitrade.png");
  const green_ghana = require("../images/greenghana.png");

  return (
    <div className="project-section">
      <Container id='projects' maxWidth="lg" sx={{ marginTop: "125px", paddingTop: '125px' }}>
        <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay="0" >
          <Typography>Projects</Typography>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobileDevice
              ? "repeat(1, minmax(0, 1fr))"
              : isTabletDevice
              ? "repeat(2, minmax(0, 1fr))"
              : "repeat(3, minmax(0, 1fr))",
            rowGap: "50px",
            gap: "20px",
            marginTop: "50px",
            width: "fit-content",
          }}>
          <ProjectCard
            delay="500"
            link={urls.blogUrl}
            image={blog_image}
            projectType={projectType.web}
            projectDescr={description.blogDescr}
          />
          <ProjectCard
            delay="600"
            link={urls.arrantUrl}
            image={arrant_image}
            projectType={projectType.web}
            projectDescr={description.arrantDescr}
          />
          <ProjectCard
            delay="700"
            link={urls.greenGhanaUrl}
            image={green_ghana}
            projectDescr={description.greenGhanaDescr}
            projectType={projectType.mobile}
          />
          <ProjectCard
            delay="800"
            link={urls.storifyUrl}
            image={storify_image}
            projectDescr={description.storifyDescr}
            projectType={projectType.web}
          />
          <ProjectCard
            delay="900"
            link={urls.movieWebUrl}
            image={movie_image}
            projectDescr={description.movieWebUrl}
            projectType={projectType.web}
          />
          <ProjectCard
            delay="1000"
            link={urls.profitradeUrl}
            image={profitrade}
            projectDescr={description.profitradeDescr}
            projectType={projectType.web}
          />
          <ProjectCard
            delay="1100"
            link={urls.theTransporterUrl}
            image=""
            projectDescr={description.theTransporterDescr}
            projectType={projectType.mobile}
          />
          <ProjectCard
            delay="1200"
            link={urls.theTransporterCourierUrl}
            image=""
            projectDescr={description.theTransporterCourierDescr}
            projectType={projectType.mobile}
          />
        </div>
      </Container>
    </div>
  );
}
