package com.example.scheduleapi.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Data
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "SCHEDULE")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "USER_ID")
    private Long userId;
    @Column(name = "RECORD_ID")
    private Long recordId;
    @Column(name = "NOTE")
    private String note;

}
