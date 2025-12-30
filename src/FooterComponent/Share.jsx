import React, { useState } from "react";

const Share = () => {
    // eslint-disable-next-line no-unused-vars
    const [copyText, setCopyText] = useState("ccd1dd2d");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(copyText);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="w-full min-h-screen bg-[#e9f7ee] p-4">
            {/* Top Income Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="bg-white p-5 rounded-lg shadow text-center">
                    <h2 className="text-3xl font-bold text-green-600">0</h2>
                    <p className="text-gray-600 mt-1">মোট আমন্ত্রণ</p>
                </div>

                <div className="bg-white p-5 rounded-lg shadow text-center">
                    <h2 className="text-3xl font-bold text-green-600">0.00</h2>
                    <p className="text-gray-600 mt-1">মোট আয়</p>
                </div>
            </div>

            {/* Invite Code Section */}
            <div className="bg-white p-5 rounded-lg shadow mb-5">
                <h3 className="text-xl font-bold mb-2">আমার আমন্ত্রণ কোড</h3>

                <div className="flex justify-between items-center bg-green-100 p-3 rounded-lg relative">
                    <span className="text-lg font-semibold">{copyText}</span>
                    <button
                        onClick={handleCopy}
                        className="bg-red-400 text-white px-4 py-2 rounded-lg text-sm relative"
                    >
                        কপি করুন
                        {copied && (
                            <span className="absolute top-0 right-0 -translate-y-full text-xs text-white bg-green-500 px-2 py-1 rounded-lg">
                                কপি হয়েছে!
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Instruction Section */}


            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
                {/* Heading */}
                <h3 className="text-lg text-start font-bold mb-4">
                    অতিরিক্ত আয়ের জন্য এজেন্টদের প্রস্তাব করুন:
                </h3>

                {/* Ordered List */}
                <ol className="list-decimal text-start list-inside text-gray-700 text-sm space-y-3 leading-relaxed">
                    <li>
                        আমন্ত্রণ লিঙ্কটি কপি করুন এবং আপনার বন্ধুদের সাথে শেয়ার করুন, যারা আপনার অধস্তন হয়ে যাবে।
                    </li>
                    <li>
                        যখনই আপনি ১ জন ব্যবহারকারীকে একটি খামার অ্যাকাউন্ট নিবন্ধনের জন্য আমন্ত্রণ জানান, আপনি ১টি রুলেট ড্র পেতে পারেন।
                    </li>
                    <li>
                        যখন আপনার অধীনস্থরা কোন পণ্য কিনবেন, আপনি 60-7,000 টাকার পুরস্কার পেতে পারেন।
                    </li>
                    <li>
                        একই সময়ে, আপনি ৫% কমিশনও পেতে পারেন।
                    </li>
                    <li>
                        এখন থেকে, আপনি প্রতিদিন ২% লভ্যাংশ পাবেন।
                    </li>
                    <li>
                        ভবিষ্যতে, যতক্ষণ আপনার ক্লায়েন্টরা যেকোনো পণ্যে বিনিয়োগ চালিয়ে যাবেন, ততক্ষণ আপনি কমিশন এবং লভ্যাংশ পেতে থাকবেন।
                    </li>
                </ol>
            </div>

        </div>
    );
};

export default Share;
