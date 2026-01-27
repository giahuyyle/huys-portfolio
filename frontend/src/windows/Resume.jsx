import { useEffect, useState } from "react";
import React from 'react'
import { useItemsStore } from "#store/items";

import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import { Download } from "lucide-react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

const Resume = () => {
    const { getByKey, loadAll } = useItemsStore();
    const [ resumeUrl, setResumeUrl ] = useState("");

    const openResume = async () => {
        const data = await getByKey("resume");
        const url = data?.resumeUrl || "files/Huy-Le-Resume.pdf";
        setResumeUrl(url);
    };

    useEffect(() => {
        loadAll();
        openResume();
    }, [loadAll]);

    return (
        <>
            <div id="window-header">
                <WindowControls target="resume" />
                <h2>
                    Huy-Le-Resume.pdf
                </h2>

                <a href="files/Huy-Le-Resume.pdf" download className="cursor-pointer" title="Download Resume">
                    <Download className="icon" />
                </a>
            </div>

            <Document
                file={resumeUrl}
            >
                <Page
                    pageNumber={1}
                    renderTextLayer
                    renderAnnotationLayer
                />
            </Document>
        </>
    );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;