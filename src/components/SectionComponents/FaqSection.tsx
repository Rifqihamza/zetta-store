import FreesetsReveal from "../ui/AnimationReveal";

export default function FAQSection() {
    const faqData = [
        {
            question: "Apa itu Zetta Store?",
            answer: "Zetta Project adalah platform penyedia aset digital premium mulai dari landing page, UI Kit, hingga template siap pakai untuk mempercepat workflow desain dan development kamu."
        },
        {
            question: "Bagaimana cara mengakses produk setelah membeli?",
            answer: "Setelah pembayaran terverifikasi, kamu akan menerima email konfirmasi berisi link akses produk. Kamu juga bisa mengaksesnya kapan saja melalui dashboard member di Scalev."
        },
        {
            question: "Apakah ada biaya langganan bulanan?",
            answer: "Tidak. Semua produk di Zetta Project bersifat One-Time Payment. Kamu cukup bayar sekali untuk akses selamanya (Lifetime Access) termasuk pembaruan di masa mendatang."
        },
        {
            question: "Apakah saya bisa menjual kembali (Resell) aset ini?",
            answer: "Tergantung lisensi produk tersebut. Produk dengan lisensi PLR/U-PLR diperbolehkan untuk dijual kembali, sementara lisensi personal hanya untuk penggunaan pribadi atau client."
        }
    ];

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6 px-4 py-26">
            <FreesetsReveal>
                <div className="flex flex-col items-center mb-20 space-y-6">
                    {/* Badge FAQ */}
                    <div className="bg-black text-(--background) px-4 py-1 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] border-2 border-black shadow-[4px_4px_0px_0px_rgba(251,107,162,1)]">
                        Support_Center v2.0
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter text-center leading-none italic">
                        Any <span className="text-(--secondary) not-italic">Questions?</span>
                    </h2>

                    <p className="text-black font-bold text-sm md:text-base text-center bg-white border-4 border-black px-6 py-2 [box-shadow:6px_6px_0px_0px_rgba(0,0,0,1)] uppercase tracking-tight">
                        Frequently Asked Questions
                    </p>
                </div>
            </FreesetsReveal>

            <div className="space-y-4">
                {faqData.map((faq, index) => (
                    <FreesetsReveal key={index}>
                        {/* Card FAQ dengan Hover Effect */}
                        <div className="group rounded-2xl overflow-hidden bg-white">
                            <div className="collapse collapse-arrow rounded-none">
                                <input type="radio" name="FaqSection" />

                                {/* Judul / Pertanyaan */}
                                <div className="collapse-title flex items-center gap-4 text-lg md:text-xl font-black text-black p-4 uppercase tracking-tighter bg-(--primary) group-hover:bg-(--primary)/70 transition-colors">
                                    <span className="text-(--text-alt) font-mono italic">0{index + 1}.</span>
                                    <span className="flex-1 text-(--text-alt)">{faq.question}</span>
                                </div>

                                {/* Isi / Jawaban */}
                                <div className="collapse-content px-8">
                                    <div className="pt-4">
                                        <p className="text-black/80 font-bold leading-relaxed md:text-xl font-mono lowercase tracking-tight">
                                            {/* Efek ala terminal untuk jawaban */}
                                            <span className="text-(--secondary) mr-2 font-black">{">"}</span>
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FreesetsReveal>
                ))}
            </div>

            {/* Support Footer */}
            <div className="mt-16 text-center">
                <p className="text-xs font-black uppercase tracking-widest text-black/70">
                    Still confused? contact our neural network at zettaproject30@gmail.com
                </p>
            </div>
        </div>
    );
}