package com.capstone.timepay.domain.agent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AgentRepository  extends JpaRepository<Agent,Long>, JpaSpecificationExecutor<Agent> {
    
}
