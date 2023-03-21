import { Container, Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import ProjectCard from "./preoject-card";

enum projectType {
  web = "Web Development",
  mobile = "Mobile App Development",
  design = "User Interface Design",
}

enum blogP {
  blog_url = "https://bhagg-bloggs-frontend.vercel.app/",
  blog_descr = "Blog Website (Bhagg Bloggs)",
}
enum arrant {
  arr_url = "https://arrantservices.org/",
  arr_descr = "Official Website for Arrant Services",
}

enum GreenGhana {
  url = "",
  descr = "Green Ghana (Soon to be released)",
}

enum Storify {
  url = "https://storify-ten.vercel.app/",
  descr = "E-Commerce (Development in Progress)",
}

enum MovieWeb {
  url = "https://teebhagg.github.io/dpmovies/",
  descr = "Movie Web App (Undergoing redesign)",
}
enum Documentaries {
  url = "",
  descr = "Photography Portfolio (Development in Progress)",
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
            link={blogP.blog_url}
            image={blog_image}
            projectType={projectType.web}
            projectDescr={blogP.blog_descr}
          />
          <ProjectCard
            delay="600"
            link={arrant.arr_url}
            image={arrant_image}
            projectType={projectType.web}
            projectDescr={arrant.arr_descr}
          />
          <ProjectCard
            delay="700"
            link=""
            image=""
            projectDescr={GreenGhana.descr}
            projectType={projectType.mobile}
          />
          <ProjectCard
            delay="800"
            link={Storify.url}
            image={storify_image}
            projectDescr={Storify.descr}
            projectType={projectType.web}
          />
          <ProjectCard
            delay="900"
            link={MovieWeb.url}
            image={movie_image}
            projectDescr={MovieWeb.descr}
            projectType={projectType.web}
          />
          <ProjectCard
            delay="1000"
            link=""
            image=""
            projectDescr={Documentaries.descr}
            projectType={projectType.web}
          />
        </div>
      </Container>
    </div>
  );
}
