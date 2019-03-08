package dinhnguyen.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dinhnguyen.demo.entity.Bill;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
		
	@Query("SELECT bill FROM Bill bill WHERE bill.title = :name")
	Bill seachBillWittName(@Param("name") String name);

}

