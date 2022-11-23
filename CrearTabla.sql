
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Juguetes]') AND type in (N'U'))
DROP TABLE [dbo].[Juguetes]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Juguetes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Descripcion] [varchar](100) NULL,
	[RestriccionEdad] [int] NULL,
	[Compania] [varchar](50) NOT NULL,
	[Precio] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK_Person] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Juguetes] ADD  DEFAULT ('') FOR [Descripcion]
GO

ALTER TABLE [dbo].[Juguetes] ADD  DEFAULT ((0)) FOR [RestriccionEdad]
GO

ALTER TABLE [dbo].[Juguetes]  WITH CHECK ADD  CONSTRAINT [check_edad] CHECK  (([RestriccionEdad]>=(0) AND [RestriccionEdad]<=(100)))
GO

ALTER TABLE [dbo].[Juguetes] CHECK CONSTRAINT [check_edad]
GO

ALTER TABLE [dbo].[Juguetes]  WITH CHECK ADD  CONSTRAINT [check_precio] CHECK  (([Precio]>(0.00)))
GO

ALTER TABLE [dbo].[Juguetes] CHECK CONSTRAINT [check_precio]
GO

