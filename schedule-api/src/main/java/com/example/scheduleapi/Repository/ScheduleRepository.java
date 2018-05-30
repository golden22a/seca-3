package com.example.scheduleapi.Repository;

import com.example.scheduleapi.Model.Schedule;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;

public interface ScheduleRepository extends CrudRepository<Schedule, Long> {

    @Query("SELECT s FROM Schedule s WHERE s.userId = :user_id")
    Iterable<Schedule> findAllByUser(Long user_id);
    @Query("SELECT s FROM Schedule s WHERE s.userId = :user_id and s.recordId = :id")
     Schedule getSchdule(Long user_id,Long id);
}