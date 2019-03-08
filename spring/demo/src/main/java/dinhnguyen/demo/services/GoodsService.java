package dinhnguyen.demo.services;

import java.util.List;

import dinhnguyen.demo.entity.Goods;

public interface GoodsService {

	public List<Goods> list();

	public Goods add(Goods goods);

	public Goods get(Long id);

	public Goods update(Goods goods);

	public void delete(Long id);

	public List<Goods> searchByConditions(String code, String name, int page);

	public int numberOfRecord(String code, String name);

}
