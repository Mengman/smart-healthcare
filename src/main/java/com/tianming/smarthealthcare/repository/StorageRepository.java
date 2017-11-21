package com.tianming.smarthealthcare.repository;

import com.tianming.smarthealthcare.domain.Storage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StorageRepository extends JpaRepository<Storage, Long> {

    Storage findByFileName(String filename);

    Optional<Storage> findById(Long xrayId);
}
