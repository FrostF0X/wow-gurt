import './styles/Home.css';

function Home() {
    return (
        <div className={"home"}>
            <div className="home-link">
                <a href="/survey">Survey</a>
            </div>
            <div className={"home-image-container"}>
                <img className={"home-image"} src="/ccchaos.svg" alt="ccchaos"/>
            </div>
        </div>
    );
}

export default Home;
