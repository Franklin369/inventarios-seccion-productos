import { useQuery } from "@tanstack/react-query";
import {
  ProductosTemplate,
  SpinnerLoader,
  useCategoriasStore,
  useEmpresaStore,
  useMarcaStore,
  useProductosStore,
} from "../index";

export function Productos() {
  const {mostrarMarca} = useMarcaStore()
  const {mostrarcategorias}= useCategoriasStore()
  const { mostrarproductos, dataproductos, buscarproductos, buscador } = useProductosStore();
  const { dataempresa } = useEmpresaStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar productos", { _id_empresa: dataempresa?.id }],
    queryFn: () => mostrarproductos({ _id_empresa: dataempresa?.id }),
    enabled: dataempresa?.id != null,
  });
  const { data: buscardata } = useQuery({
    queryKey: [
      "buscar productos",
      { id_empresa: dataempresa.id, descripcion: buscador },
    ],
    queryFn: () =>
      buscarproductos({ _id_empresa: dataempresa.id, buscador: buscador }),
    enabled: dataempresa.id != null,
  });
  const { data:datamarcas } = useQuery({
    queryKey: ["mostrar marca", { id_empresa: dataempresa?.id }],
    queryFn: () => mostrarMarca({ id_empresa: dataempresa?.id }),
    enabled: dataempresa?.id != null,
  });
  const { data:datacategorias } = useQuery({
    queryKey: ["mostrar categorias", { id_empresa: dataempresa?.id }],
    queryFn: () => mostrarcategorias({ id_empresa: dataempresa?.id }),
    enabled: dataempresa?.id != null,
  });
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...</span>;
  }

  return <ProductosTemplate data={dataproductos}/>;
}
