using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace General.Librerias.AccesoDatos
{
    public class daSQL
    {
        private string CadenaConexion;

        public daSQL(string nombreCadena = "conProvias")
        {
            if (!string.IsNullOrEmpty(nombreCadena))
            {
                var connSetting = ConfigurationManager.ConnectionStrings[nombreCadena];
                if (connSetting != null)
                {
                    CadenaConexion = connSetting.ConnectionString;
                }
            }
        }

        public string EjecutarComando(string procedimientoOComando, CommandType tipoComando = CommandType.StoredProcedure)
        {
            string rpta = "";
            using (SqlConnection con = new SqlConnection(CadenaConexion))
            {
                con.Open();
                rpta = ejecutarConsultaCSV(con, procedimientoOComando, tipoComando);
            }
            return rpta;
        }

        public string ejecutarConsultaCSV(string procedimientoOComando, string nombreCadena = "conProvias", CommandType tipoComando = CommandType.StoredProcedure)
        {
            string rpta = "";
            string cadena = !string.IsNullOrEmpty(CadenaConexion) ? CadenaConexion : ConfigurationManager.ConnectionStrings[nombreCadena].ConnectionString;
            using (SqlConnection con = new SqlConnection(cadena))
            {
                con.Open();
                rpta = ejecutarConsultaCSV(con, procedimientoOComando, tipoComando);
            }
            return rpta;
        }

        public string ejecutarConsultaCSV(SqlConnection con, string procedimientoOComando, CommandType tipoComando = CommandType.StoredProcedure)
        {
            StringBuilder sb = new StringBuilder();

            using (SqlCommand cmd = new SqlCommand(procedimientoOComando, con))
            {
                cmd.CommandType = tipoComando;

                using (SqlDataReader drd = cmd.ExecuteReader())
                {
                    if (drd != null)
                    {
                        bool primerCursor = true;

                        do
                        {
                            if (!primerCursor)
                            {
                                sb.Append("~");
                            }
                            primerCursor = false;

                            int nCampos = drd.FieldCount;

                            if (nCampos == 1 && (string.IsNullOrEmpty(drd.GetName(0)) || drd.GetName(0).StartsWith("Column")))
                            {
                                while (drd.Read())
                                {
                                    if (!drd.IsDBNull(0))
                                    {
                                        sb.Append(drd.GetValue(0).ToString());
                                    }
                                }
                            }
                            else
                            {
                                // 1. Cabeceras
                                for (int i = 0; i < nCampos; i++)
                                {
                                    sb.Append(drd.GetName(i));
                                    if (i < nCampos - 1) sb.Append("|");
                                }
                                sb.Append("¬");

                                // 2. Datos
                                while (drd.Read())
                                {
                                    for (int i = 0; i < nCampos; i++)
                                    {
                                        if (!drd.IsDBNull(i))
                                        {
                                            string valor = drd.GetValue(i).ToString().Replace("\r", "").Replace("\n", " ");
                                            sb.Append(valor);
                                        }
                                        if (i < nCampos - 1) sb.Append("|");
                                    }
                                    sb.Append("¬");
                                }

                                // Quitar el último '¬' si sobró
                                if (sb.Length > 0 && sb[sb.Length - 1] == '¬')
                                {
                                    sb.Length--;
                                }
                            }

                        } while (drd.NextResult());
                    }
                }
            }

            return sb.ToString();
        }
    }
}