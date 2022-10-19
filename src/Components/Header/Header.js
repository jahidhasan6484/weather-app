import Search from "../Search/Search";

const Header = () => {
    return (
            <>
            <header className="blog-header lh-1 py-3">
                <div className="row flex-nowrap justify-content-between align-items-center">
                    <div className="col-4 pt-1">
                        <p>June 11, 22</p>
                    </div>
                    <div className="col-4 text-center">
                        <p>Weather App</p>
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        <p>02:35 AM</p>
                    </div>
                </div>
            </header>
            <Search />
            </>

    )
}

export default Header;