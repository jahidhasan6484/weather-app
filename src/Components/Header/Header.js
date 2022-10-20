import Search from "../Search/Search";

const Header = () => {
    return (
            <>
            <header className="blog-header lh-1 py-3">
                <div className="row flex-nowrap justify-content-between align-items-center">
                    <div className="logo col-12">
                        <p>Weather App</p>
                    </div>
                </div>
            </header>
            <Search />
            </>

    )
}

export default Header;