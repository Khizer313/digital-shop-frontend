import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import "./Header.scss";
import Search from "./Search/Search";
import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";

const Header = () => {
    const { name, cartCount, showCart, setShowCart } = useContext(Context);
    const [scrolled, setScrolled] = useState(false);
    const [searchModal, setSearchModal] = useState(false);
    const navigate = useNavigate();

    const handleScroll = () => {
        const offset = window.scrollY;
        setScrolled(offset > 200);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`main-header ${scrolled ? "sticky-header" : ""}`}
            >
                <div className="header-content">
                    <ul className="left">
                        <li onClick={() => navigate("/")}>Home</li>
                        <li>
                            <a href="#Category">Categories</a>
                        </li>
                        <li>
                            <a href="#Product">Products</a>
                        </li>
                        <li>
                            <a href="#Footer">About</a>
                        </li>
                    </ul>
                    <div className="center" onClick={() => navigate("/")}>
                        {name?.data?.[0]?.name || "JSDEVSTORE"}
                    </div>
                    <div className="right">
                        <TbSearch onClick={() => setSearchModal(true)} />
                        <span
                            className="cart-icon"
                            onClick={() => setShowCart(true)}
                        >
                            <CgShoppingCart />
                            {!!cartCount && <span>{cartCount}</span>}
                        </span>
                    </div>
                </div>
            </header>
            {searchModal && <Search setSearchModal={setSearchModal} />}
            {showCart && <Cart />}
        </>
    );
};

export default Header;
