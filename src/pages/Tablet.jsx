import React, { useEffect, useState } from "react";
import { sliderPC, bannerPC } from "../components/PCPrint/data";
import "../assets/css//tabletlaptop/tablet.css";
import TopSlider from "../components/PCPrint/TopSlider";
import ListProductOld from "../components/ProductOld/ListProductOld";
import productHandler from "../features/product/function";
import Product from "../components/phone/Product";
import SkeletonProducts from "../components/phone/SkeletonProducts";

// lọc theo hãng, giá + sắp xếp tăng giảm
const Tablet = () => {
  const [isLoading, setIsLoading] = useState(true);
  //
  const [showSub, setShowSub] = useState({
    manufacturerId: 0,
    categoryId: 3,
    subCategoryId: 0,
    page: 1,
    size: 20,
  });

  const [totalQt, setTotalQt] = useState(0);
  const [tempList, setTempList] = useState();

  const [listProduct, setListProduct] = useState(0);

  const listTemp = tempList;

  useEffect(() => {
    productHandler
      .getProductsByCategory({ categoryName: "Tablet" })
      .then((res) => {
        setIsLoading(res.isLoading);

        setListProduct(res.data);

        setTotalQt(res.data);
      });
  }, [showSub]);

  // lọc theo giá
  const filterPrice = (priceMin, priceMax) => {
    const result = listTemp.filter((curData) => {
      // return curData?.price > priceMax;
      switch (priceMax) {
        case 30000000:
          return curData?.price > priceMax;
        case 29999999:
          return curData?.price > priceMin && curData?.price <= priceMax;
        case 19999999:
          return curData?.price > priceMin && curData?.price <= priceMax;
        default:
          return curData?.price < priceMax;
      }
    });

    setListProduct(result);
  };

  // sắp xếp tăng giảm
  const handleSort = (e) => {
    const sort = e.target.value;
    if (sort === "tang") {
      setListProduct(listProduct?.slice().sort((a, b) => a.price - b.price));
    }
    if (sort === "giam") {
      setListProduct(listProduct?.slice().sort((a, b) => b.price - a.price));
    }
  };
  return (
    <div className="grid wide">
      <div className="paddingtoppx"></div>
      {/* thêm slider   */}
      <TopSlider sliders={sliderPC} banners={bannerPC} />

      <div>
        <div className="box_filter">
          <div className="scroll">
            <div className="scroll_main_item">
              <div className="bolocx">
                <button className="item_btn">
                  <i class="fa-solid fa-filter"></i>
                  &nbsp;Bộ lọc
                </button>
              </div>
              <div className="hangx">
                <button className="item_btn">
                  Hãng&nbsp;
                  <i class="fa-solid fa-caret-down"></i>
                </button>
                <div className="thechuakhoangtrong">
                  <div
                    className="theconcuahang"
                    style={{
                      position: "relative",
                      zIndex: "50",
                    }}
                  >
                    <div className="box_quicklinkhang">
                      <button
                        className="quicklink"
                        onClick={() =>
                          setShowSub({
                            manufacturerId: 1,
                            categoryId: 3,
                            subCategoryId: 0,
                            page: 1,
                            size: 20,
                          })
                        }
                      >
                        iPad
                      </button>
                      <button
                        className="quicklink"
                        onClick={() =>
                          setShowSub({
                            manufacturerId: 2,
                            categoryId: 3,
                            subCategoryId: 0,
                            page: 1,
                            size: 20,
                          })
                        }
                      >
                        Samsung
                      </button>
                      <button className="quicklink">Xiaomi</button>
                      <button className="quicklink">Lenovo</button>
                      <button className="quicklink">Masstel</button>
                      <button className="quicklink">Nokia</button>
                      <button className="quicklink">Huawei</button>
                      <button className="quicklink">Alcate</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="giax">
                <button className="item_btn">
                  Giá&nbsp;
                  <i class="fa-solid fa-caret-down"></i>
                </button>

                <div className="thechuakhoangtrong">
                  <div className="thecongia"                 style={{
                  position:'relative',
zIndex:'50'
                 }}>
                    <div className="box_quicklinkgia">
                      <button
                        className="btnconmenu"
                        onClick={() => filterPrice(0, 10000000)}
                      >
                        Dưới 10 triệu
                      </button>
                      <button
                        className="btnconmenu"
                        onClick={() => filterPrice(10000000, 19999999)}
                      >
                        Từ 10 - 20 triệu
                      </button>
                      <button
                        className="btnconmenu"
                        onClick={() => filterPrice(20000000, 29999999)}
                      >
                        &nbsp;Từ 20 - 30 triệu&nbsp;
                      </button>
                      <button
                        className="btnconmenu"
                        onClick={() => filterPrice(0, 30000000)}
                      >
                        Trên 30 triệu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isLoading ? (
          <SkeletonProducts />
        ) : (
          listProduct.length > 0 && <Product list={listProduct} qt={totalQt} />
        )}
      </div>
    </div>
  );
};

export default Tablet;
