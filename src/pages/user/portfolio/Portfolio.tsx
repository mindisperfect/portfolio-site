import PortfolioItem from "../../../components/layout/info/PortfolioItem"
import "./portfolio.scss"

const Portfolio = () => {
  return (
    <section className="portfolio section">
      <h2 className="section__title">
        My <span>Portfolio</span>
      </h2>
      <div className="portfolio__container container grid">
           <PortfolioItem />
      </div>
    </section>
  )
}

export default Portfolio