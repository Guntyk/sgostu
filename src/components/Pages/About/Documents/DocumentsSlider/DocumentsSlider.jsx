import { documentTypesSelector } from "../../../../../redux/documentTypes/selectors";
import { documentsSelector } from "../../../../../redux/documents/selectors";
import { getDocumentTypes } from "../../../../../redux/documentTypes/thunk";
import BackButton from "../../../../../common/BackButton/BackButton";
import { getDocuments } from "../../../../../redux/documents/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../../../../Loader/Loader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Mousewheel } from "swiper";
import Card from "./Card/Card";
import "./DocumentsSlider.css";
import "swiper/css";

export default function DocumentsSlider() {
  const language = window.localStorage.getItem("language");
  const [activeSlideIdx, setActiveSlideIdx] = useState({});
  const documentTypes = useSelector(documentTypesSelector);
  const documents = useSelector(documentsSelector);
  const { documentsType } = useParams();
  const dispatch = useDispatch();
  const filteredDocs = documents.filter(
    (document) =>
      document.attributes.document_type.data.id === Number(documentsType)
  );

  useEffect(() => {
    if (documents.length === 0 || documentTypes.length === 0) {
      dispatch(getDocumentTypes());
      dispatch(getDocuments());
    }
  }, []);

  return (
    <div className="slider-box">
      <BackButton className="docs-back-btn" />
      {documents.length !== 0 ? (
        documents
          .filter(
            (document) =>
              document.attributes.document_type.data.id ===
              Number(documentsType)
          )
          .map((document) => (
            <div
              key={document.id}
              className={`document-overlay ${
                filteredDocs.indexOf(document) === activeSlideIdx
                  ? "active"
                  : ""
              }`}
            >
              <div className="document-info-wrapper">
                <h1 className="document-card-name">
                  {language === "ua"
                    ? document.attributes.name
                    : document.attributes.name_en}
                </h1>
                <div className="document-card-btn-wrapper">
                  <a
                    href={`https://sgostu-backend.download${document.attributes.file.data.attributes.url}`}
                    rel="noreferrer"
                    target="_blank"
                    className="document-card-btn"
                  >
                    {language === "ua" ? "Відкрити" : "Open"}
                  </a>
                </div>
              </div>
            </div>
          ))
      ) : (
        <Loader />
      )}
      <Swiper
        className="slider-doc"
        modules={[Mousewheel]}
        speed={800}
        draggable={false}
        centeredSlides={true}
        slidesPerView={2}
        mousewheel={true}
        onSwiper={(e) => {
          setActiveSlideIdx(e.activeIndex);
        }}
        onSlideChange={(e) => {
          setActiveSlideIdx(e.activeIndex);
        }}
        breakpoints={{
          1600: {
            slidesPerView: 4,
          },
          1150: {
            slidesPerView: 3,
            draggable: false,
          },
          840: {
            slidesPerView: 2.5,
            draggable: false,
          },
          550: {
            slidesPerView: 2,
            draggable: false,
          },
        }}
      >
        {documents.length !== 0 ? (
          documents
            .filter(
              (document) =>
                document.attributes?.document_type.data.id ===
                Number(documentsType)
            )
            .map((document) => (
              <SwiperSlide key={document.id}>
                <Card card={document.attributes} />
              </SwiperSlide>
            ))
        ) : (
          <Loader />
        )}
      </Swiper>
    </div>
  );
}
