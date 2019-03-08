package dinhnguyen.demo.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dinhnguyen.demo.entity.Goods;

@Repository
@Transactional
public interface GoodsRepository extends JpaRepository<Goods, Long> {

	@Query("Select goods from Goods goods where goods.code like :code OR goods.name like :name")
	public List<Goods> searchByConditions(@Param("code") String code, @Param("name") String name, Pageable pageable);
	
	@Query(value = "Select count(*) from Goods goods where goods.code like :code OR goods.name like :name", nativeQuery = true)
	public int numberOfRecord(@Param("code") String code, @Param("name") String name);

}
