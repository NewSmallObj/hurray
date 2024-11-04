import Link from "next/link";

export default function Timeline() {
	return (
		<ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
			<li>
				<div className="timeline-middle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="#915eff"
						className="h-5 w-5"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="timeline-start mb-10 md:text-end rounded-lg bg-[#172033] p-2 box-border">
					<time className="font-mono italic text-white">2024</time>
					<div className="text-lg text-white font-bold">
            中原电气实验室
					</div>
					<div className="text-slate-300 text-sm mt-2 mb-6">新闻资讯类网站、后台管理端、前台展示端。</div>
          <Link target={'_blank'} className="text-white underline hover:text-[#915eff] transition-all mt-2 cursor-pointer" rel="stylesheet" href="https://zy-electric.cn/" >查看</Link>
				</div>
				<hr />
			</li>
			<li>
				<hr />
				<div className="timeline-middle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="h-5 w-5"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="timeline-end mb-10 rounded-lg bg-[#172033] p-2 box-border">
					<time className="font-mono italic">2023</time>
					<div className="text-lg text-white font-bold">
            镕易医疗撮合平台
					</div>
					<div className="text-slate-300 text-sm mt-2 mb-6">
            医疗撮合平台、平台端、平台管理端、需求方端、服务商端、供应商端、微信小程序端。
          </div>
          <Link target={'_blank'} className="text-white underline hover:text-[#915eff] transition-all cursor-pointer" rel="stylesheet" href="https://www.rong-e.cn/" >查看</Link>
				</div>
				<hr />
			</li>
			<li>
				<hr />
				<div className="timeline-middle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="#915eff"
						className="h-5 w-5"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="timeline-start mb-10 md:text-end  rounded-lg bg-[#172033] p-2 box-border">
					<time className="font-mono italic">2023</time>
					<div className="text-lg text-white font-bold">
            矿石破碎流程计算（内网系统）
					</div>
					<div className="text-slate-300 text-sm mt-2 mb-6">
            矿石破碎流程模拟系统
          </div>
          <Link target={'_blank'} className="text-white underline hover:text-[#915eff] transition-all cursor-pointer" rel="stylesheet" href="https://test.lymatrix.com/mine/index.html" >查看（测试地址随时关闭）</Link>
				</div>
				<hr />
			</li>
			<li>
				<hr />
				<div className="timeline-middle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="h-5 w-5"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="timeline-end mb-10  rounded-lg bg-[#172033] p-2 box-border">
					<time className="font-mono italic">2023</time>
					<div className="text-lg text-white font-bold">
            垃圾分类管理系统（内网系统）
					</div>
					<div className="text-slate-300 text-sm mt-2 mb-6">
            用于垃圾分类中各街道辖区城市数据上报、统计分析、任务分发等功能。现已发布20多个城市。
          </div>
				</div>
				<hr />
			</li>
			<li>
				<hr />
				<div className="timeline-middle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="h-5 w-5"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="timeline-start mb-10 md:text-end rounded-lg bg-[#172033] p-2 box-border">
					<time className="font-mono italic">2022</time>
					<div className="text-lg text-white font-bold">
            DCH（内网系统）
					</div>
					<div className="text-slate-300 text-sm mt-2 mb-6">
            园区设备工作监控及计划指定下发平台、多语言、多厂商、多设备配置等。
          </div>
				</div>
			</li>
		</ul>
	)
}
