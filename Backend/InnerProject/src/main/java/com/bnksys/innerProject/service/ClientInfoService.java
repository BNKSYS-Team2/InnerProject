package com.bnksys.innerProject.service;

import java.util.List;

import com.bnksys.innerProject.domain.ClientInfo;
import com.bnksys.innerProject.dto.ClientUnitDto;

public interface ClientInfoService {
	//회사목록
	List<String> company();
	
	//위치목록
	List<String> loaction(String company);
	
	//단말기목록
	List<ClientUnitDto> unit(String company, String location);
	
	boolean save(ClientInfo ci);
}
