-- Seed data for ExportAIdor MVP (10 test records)

INSERT INTO trade_measures (product_name, hs_code, country_origin, country_destination, tariff_rate, non_tariff_measures, required_documents, notes, confidence_level) VALUES
('Vino tinto embotellado', '2204.21', 'Argentina', 'Estados Unidos', '6.3 cents/liter', 'Certificado de origen, Etiquetado nutricional FDA, Límites de sulfitos', 'Factura comercial, Certificado de origen, Certificado sanitario, Etiqueta aprobada por TTB', 'Requiere aprobación previa de etiquetas por TTB (Alcohol and Tobacco Tax)', 'high'),

('Aceite de oliva extra virgen', '1509.10', 'España', 'Brasil', '10%', 'Certificado fitosanitario, Análisis de calidad, Registro en ANVISA', 'Factura comercial, Certificado de origen, Certificado de análisis, Certificado fitosanitario', 'Debe cumplir con normas de calidad de ANVISA', 'high'),

('Miel natural', '0409.00', 'Uruguay', 'Unión Europea', '17.3%', 'Certificado sanitario, Análisis de residuos, Trazabilidad completa', 'Factura comercial, Certificado sanitario, Certificado de origen, Análisis de laboratorio', 'Requiere cumplir con regulaciones EU 2019/627 sobre controles oficiales', 'high'),

('Carne bovina congelada', '0202.30', 'Brasil', 'China', '12%', 'Certificado sanitario, Certificado halal, Inspección de cuarentena', 'Factura comercial, Certificado sanitario oficial, Certificado de origen, Permiso de importación', 'Debe provenir de establecimientos registrados en GACC', 'high'),

('Café verde en grano', '0901.11', 'Colombia', 'Alemania', '0%', 'Certificado de origen, Análisis de calidad ICO', 'Factura comercial, Certificado de origen, Certificado de calidad', 'Libre de aranceles bajo acuerdo comercial UE-Colombia', 'high'),

('Textiles de algodón', '5208.31', 'India', 'México', '15%', 'Certificado de origen, Cumplimiento NOM-004-SE', 'Factura comercial, Certificado de origen, Lista de empaque', 'Puede aplicar preferencia arancelaria bajo acuerdo comercial', 'medium'),

('Maquinaria agrícola', '8432.80', 'Estados Unidos', 'Argentina', '0%', 'Certificado de origen, Declaración de conformidad técnica', 'Factura comercial, Certificado de origen, Manual técnico en español', 'Exento de arancel bajo preferencia MERCOSUR', 'high'),

('Productos farmacéuticos', '3004.90', 'Suiza', 'Chile', '0%', 'Registro ISP, Certificado GMP, Certificado de libre venta', 'Factura comercial, Certificado de origen, Certificado GMP, Autorización ISP', 'Requiere registro previo ante Instituto de Salud Pública', 'high'),

('Juguetes de plástico', '9503.00', 'China', 'Colombia', '10%', 'Certificado de conformidad, Pruebas de seguridad INVIMA', 'Factura comercial, Lista de empaque, Certificado de conformidad', 'Debe cumplir normas de seguridad NTC 4894', 'medium'),

('Equipos electrónicos', '8517.62', 'Corea del Sur', 'Perú', '0%', 'Certificado de homologación MTC, Declaración de conformidad CE', 'Factura comercial, Certificado de origen, Certificado de homologación', 'Libre de arancel bajo TLC Perú-Corea', 'high');
