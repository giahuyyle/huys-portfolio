import { useEffect, useState } from "react";
import { useItemsStore } from "#store/items";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Check, Flag } from "lucide-react";

const randomTime = Math.trunc(Math.random() * 60);

const Terminal = () => {
    const { items, getByKey, loadAll } = useItemsStore();
    const [ techStack, setTechStack ] = useState([]);

    const openStack = async () => {
        const data = await getByKey("techStack");
        setTechStack(data.techStack);
        console.log(data)
    };

    useEffect(() => {
        loadAll();
        openStack();
    }, [loadAll]);

    return (
        <>
            <div id="window-header">
                <WindowControls target="terminal" />
                <h2>
                    Tech Stack
                </h2>
            </div>

            <div className="techstack">
                <p>
                    <span className="font-bold">@huylegia % </span>
                    ls tech_stack/
                </p>

                <div className="label">
                    <p className="w-32">Categories</p>
                    <p>Technologies</p>
                </div>

                <ul className="content">
                    {techStack.map(({ category, items }) => (
                        <li key={category} className="flex items-center">
                            <Check className="check" size={20}/>
                            <h3>{category}</h3>
                            <ul>
                                {items.map((item, i) => (
                                    <li key={i}>
                                        {item}{i < items.length - 1 ? "," : ""}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                <div className="footnote">
                    <p>
                        <Check className="check" size={20} />
                        5/5 stacks loaded successfully
                    </p>

                    <p className="text-black">
                        <Flag size={15} fill="black" />
                        Render Time: {randomTime} ms
                    </p>
                </div>
            </div>
        </>
    );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;