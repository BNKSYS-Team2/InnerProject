package com.bnksys.innerProject.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bnksys.innerProject.domain.ClientInfo;

public interface ClientInfoRepository extends JpaRepository<ClientInfo, Long>{

	//회사목록 가져오기
	@Query("SELECT distinct ci.company FROM ClientInfo ci")
	Optional<List<String>> findCompany();
	
	//위치목록 가져오기
	@Query("SELECT distinct ci.location FROM ClientInfo ci where ci.company = :company")
	Optional<List<String>> findLocation(@Param("company") String company);
	
	
	//단말기목록 가져오기
	@Query("SELECT ci FROM ClientInfo ci where ci.company = :company and ci.location = :location")
	Optional<List<ClientInfo>> findUnit(@Param("company") String company, @Param("location") String location);
	
	Optional<ClientInfo> findByCompanyAndLocationAndUnit(String company, String location, String unit);
	
}
