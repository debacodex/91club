function API_DOMAIN(config={}) {
	return new Response(`window._domain=${JSON.stringify(config)};`, {
		status: 200,
		headers: {
			'content-type': 'application/javascript;charset=UTF-8',
			'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
		},
	});
}
/**
 * @description 解析json数据
 * @param  {any} value
 */
 function dataParse(value) {
	if (!value) return null;
	if (typeof value !== 'string') return value;
	try {
		return JSON.parse(value);
	}catch (e) {
		return null;
	}
}
 function getRandom(list=[]){
	return  list[Math.floor(Math.random() * list.length)];
}
 function updateHostname(newSubdomain='',origin='') {
	 if (!origin||!newSubdomain) return '';
	const url = new URL(origin);
	const currentHostname = url.hostname; // 获取当前的主机名
	const domainParts = currentHostname.split('.'); // 拆分域名
	if (domainParts.length > 2) {
		domainParts[0] = newSubdomain; // 修改二级域名
	} else {
		domainParts.unshift(newSubdomain); // 如果没有二级域名，添加一个
	}
	return `${url.protocol}//${domainParts.join('.')}`; // 拼接成新的域名
}

/**
 * @description 获取API域名配置 灾备备用域名
 * @param context
 * @returns {Promise<Response>}
 * @example  {
 *      "domain": ['https://example.com', 'https://api.example.com'], 公用域名
 * 		"lotteryapi": [], 独立彩票api
 * 		"saaslotteryapi": [],  独立saas游戏彩票
 * 		"arpayapi": []  独立arpay
 * 	 	如果配置 domain 优先使用domain 否则使用各自租户独立的域名池
 * }
 */
export async function onRequest(context) {
	const { request, env } = context
	// 解析 URL 和 query
	const url = new URL(request.url)
	const searchParams = url.searchParams
	// 判断api_domain 是否存在
	const checkApiDomain = 'api_domain' in env;
	const checkApk = 'apk' in env;
	// 彩票api域名
	let VITE_API_URL='';
	// saas彩票api域名
	let VITE_SAAS_API_URL='';
	// saas彩票json域名
	let VITE_SAAS_JSON_URL='';
	// arpay域名
	let VITE_BAST_URL='';
	if (!checkApiDomain&&!checkApk) {
		return API_DOMAIN({
			checkApiDomain,
			checkApk,
			VITE_SAAS_API_URL,
			VITE_SAAS_JSON_URL,
			VITE_BAST_URL,
			VITE_API_URL,
		});
	}
	if (!checkApiDomain) {
     	return API_DOMAIN({
			checkApiDomain,
			checkApk,
			VITE_SAAS_API_URL,
			VITE_SAAS_JSON_URL,
			VITE_BAST_URL,
			VITE_API_URL,
		});
	}
	const commonKey = 'common';
	const tenantKey = searchParams.get('_key') || 'default'; // 这里可以根据实际情况修改
	const [commonConfig,tenantConfig] = await Promise.all([
		 env.api_domain.get(commonKey),
		 env.api_domain.get(tenantKey)
	]);
	const _config= dataParse(commonConfig);
	const _tenantConfig= dataParse(tenantConfig);
	if (!_config) {
		return API_DOMAIN({
			checkApiDomain,
			checkApk,
			VITE_SAAS_API_URL,
			VITE_SAAS_JSON_URL,
			VITE_BAST_URL,
			VITE_API_URL,
		});
	};
	if (!_config.open) {
		return API_DOMAIN({
			checkApiDomain,
			checkApk,
			VITE_SAAS_API_URL,
			VITE_SAAS_JSON_URL,
			VITE_BAST_URL,
			VITE_API_URL,
		});
	}
	// 租户配置>公共配置
	const config = _tenantConfig|| _config||{};
	const arpayapi= config.arpayapi || [];
	const saaslotteryapi= config.saaslotteryapi || [];
	const lotteryapi= config.lotteryapi || [];
	const domain = _config.domain || [];
	if (domain.length>0&&!_tenantConfig){
		const domainUrl= getRandom(domain);
		const newDomain = new URL(domainUrl);
		VITE_BAST_URL= updateHostname('apiweb',newDomain.origin);
		VITE_API_URL= updateHostname(tenantKey,newDomain.origin);
		VITE_SAAS_API_URL= updateHostname('h5',newDomain.origin);
		VITE_SAAS_JSON_URL= updateHostname('draw',newDomain.origin)
	}else {
		VITE_BAST_URL= arpayapi[0] || '';
		VITE_API_URL= lotteryapi[0] || '';
		VITE_SAAS_API_URL= saaslotteryapi[0] || '';
		VITE_SAAS_JSON_URL= saaslotteryapi[0] || '';
	}
	return API_DOMAIN({
		VITE_SAAS_API_URL,
		VITE_SAAS_JSON_URL,
		VITE_BAST_URL,
		VITE_API_URL,
		checkApiDomain,
		checkApk,
	});
}