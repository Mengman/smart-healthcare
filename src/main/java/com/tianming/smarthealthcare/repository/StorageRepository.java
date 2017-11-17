package com.tianming.smarthealthcare.repository;

import com.tianming.smarthealthcare.domain.Storage;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface StorageRepository extends JpaRepository<Storage, Long> {

    Storage findByFileName(String filename);

}
