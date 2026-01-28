import { HelpCircle } from "lucide-react";
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
        <div className="w-full max-w-4xl mx-auto space-y-4 px-2 py-32">
            {/* Header Section */}
            <FreesetsReveal>
                <div className="flex flex-col items-center mb-12 space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
                    <p className="text-gray-400 text-center">Temukan jawaban cepat untuk pertanyaan yang sering diajukan.</p>
                </div>
            </FreesetsReveal>

            {/* Accordion List */}
            <div className="space-y-4">
                {faqData.map((faq, index) => (
                    <FreesetsReveal key={index}>
                        <div className="group">
                            <div className="collapse collapse-arrow bg-(--primary)/10 backdrop-blur-sm rounded-3xl border border-transparent group-hover:border-(--accent)/50 transition-all duration-300">
                                <input type="radio" name="FaqSection" defaultChecked />

                                {/* Judul / Pertanyaan */}
                                <div className="collapse-title flex items-center gap-4 text-lg font-semibold text-white p-4">
                                    <div className="rounded-full bg-(--primary)/10 border border-(--primary)/20 group-hover:bg-(--accent) group-hover:border-(--accent) transition-all duration-300 p-2.5">
                                        <HelpCircle className="w-5 h-5 text-gray-300 group-hover:text-white" />
                                    </div>
                                    <span>{faq.question}</span>
                                </div>

                                {/* Isi / Jawaban */}
                                <div className="collapse-content">
                                    <div className="pl-15 pr-4 pb-4">
                                        <p className="text-gray-400 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FreesetsReveal>

                ))}
            </div>
        </div>
    );
}